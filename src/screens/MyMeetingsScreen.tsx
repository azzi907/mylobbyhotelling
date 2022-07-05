/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  ToastAndroid,
  Platform,
  RefreshControl,
} from 'react-native';
import {useRootStoreContext} from '../Store';
import {Searchbar} from 'react-native-paper';
import DatePicker from 'react-native-date-picker';
import * as AddCalendarEvent from 'react-native-add-calendar-event';
import RNCalendarEvents from 'react-native-calendar-events';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {observer} from 'mobx-react';
import {useIsFocused} from '@react-navigation/native';
import moment from 'moment';

function MyMeetings(props: any) {
  const {store, userStore} = useRootStoreContext();
  const [refreshing, setRefreshing] = React.useState(false);
  const BACK_ICON = require('../../images/back-icon.png');
  const EDIT = require('../../images/edit.png');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [date, setDate] = useState(new Date());
  const [dateFilter, setDateFilter] = useState<any>(null);

  const [open, setOpen] = useState(false);
  const CALENDAR = require('../../images/calendar-icon.png');

  const [meetingRooms, setMeetingRooms] = useState<any>(null);
  const [filteredRooms, setFilteredRooms] = useState<any>([]);
  const BACKEND_URL = store.parameters.backendUrl;
  const isFocused = useIsFocused();
  
  const getMeetings = async () => {
    const requestOptions = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        employeeId: userStore.auth.employee.id,
        todayDate: new Date().getTime(),
      }),
    };
    fetch(`${BACKEND_URL}/api/rooms_reservations/meetings`, requestOptions)
      .then(response => response.json())
      .then(result => {
        setMeetingRooms(result.reservations);
        setFilteredRooms(result.reservations);
      })
      .catch(error => {
        console.log(error);
        ToastAndroid.show('Error fetching meeting rooms', ToastAndroid.LONG);
      });
  };

  useEffect(() => {
    if (isFocused) {
      getMeetings();
    }
  }, [isFocused]);
  async function cancleMeeting(id: any) {
    const requestOptions = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };
    fetch(
      `${BACKEND_URL}/api/rooms_reservations/cancelBooking/${id}`,
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        getMeetings();
      })
      .catch(error => {
        console.log(error);
        ToastAndroid.show('Error Canceling Meeting', ToastAndroid.LONG);
      });
  }
  useEffect(() => {
    setFilteredRooms(() => {
      if (searchQuery) {
        const filteredData = meetingRooms.filter((element: any) => {
          return element.title
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
        });
        return filteredData;
      } else {
        return meetingRooms;
      }
    });
  }, [searchQuery]);
  useEffect(() => {
    if (dateFilter) {
      setFilteredRooms(() => {
        if (filteredRooms) {
          const newDate = new Date(dateFilter).setUTCSeconds(0);
          const filteredData = filteredRooms.filter((element: any) => {
            const dateCheck = new Date(element.bookedTimeIn).setUTCSeconds(0);
            if (newDate === dateCheck) {
              return element;
            }
          });
          return filteredData;
        } else {
          return meetingRooms;
        }
      });
    }
  }, [dateFilter]);
  const editMeeting = async (data: any) => {
    const result = await AddCalendarEvent.presentEventEditingDialog({
      eventId: data.meetingId,
    });

    if (
      (result.action === 'SAVED' && Platform.OS === 'ios') ||
      (result.action === 'CANCELED' && Platform.OS === 'android')
    ) {
      const reservation = await RNCalendarEvents.findEventById(data.meetingId);
      const requestOptions = {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: userStore.auth.employee.name,
          title: reservation?.title,
          invitees: reservation?.attendees,
          location: reservation?.location,
          siteName: userStore.auth.sites[0]?.name,
          company: userStore.auth.employee.company,
          phone: userStore.auth.employee.phonesms,
          email: userStore.auth.employee.email,
          jobTitle: userStore.auth.employee.jobTitle,
          isRoom: data.isRoom,
          isDesk: data.isDesk,
          isOffice: data.isOffice,
          bookingType: data.bookingType,
          siteId: userStore.auth.siteId,
          accountId: userStore.auth.employee.accountId,
          employeeId: userStore.auth.employee.id,
          roomId: data.roomId,
          roomName: data.roomName,
          bookedTimeIn: new Date(
            reservation?.startDate ? reservation?.startDate : '',
          ).getTime(),
          bookedTimeOut: new Date(
            reservation?.endDate ? reservation?.endDate : '',
          ).getTime(),
          meetingId: reservation?.id,
        }),
      };
      fetch(
        `${BACKEND_URL}/api/rooms_reservations/edit/${data.id}`,
        requestOptions,
      )
        .then(response => response.json())
        .then((r: any) => {
          getMeetings();
          // props.navigation.navigate('UpdatedMeeting', {
          //   reservations: r.reservation,
          // });
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  const onChangeSearch = (query: React.SetStateAction<string>) => {
    setSearchQuery(query);
  };
  const wait = (timeout : any) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() =>{ 
    getMeetings();
    setRefreshing(false)
  });
  }, []);
  
  return (
    <SafeAreaView style={styles.page}>
      <View style={styles.container}>
        <View style={{flexDirection: 'row', marginTop: 15, justifyContent:'flex-start'}}>
          <TouchableOpacity
            style={{display: 'flex', flexDirection: 'row' , justifyContent:'center'}}
            onPress={() => {
              props.navigation.navigate('Booking', {...props.route.params});
            }}>
            <Image style={{marginTop: 2, height:hp(1.5), width:wp(2.5)}} source={BACK_ICON} />
            <Text style={{color: '#51D1FA', marginLeft: 4 , fontSize:hp(1.7)}}>Back</Text>
          </TouchableOpacity>
        </View>
          <Text
          style={{alignSelf: 'center', fontWeight: '700', fontSize: hp(3.75)}}>
          My Meetings
        </Text>
        <TouchableOpacity
          onPress={() => {
            setFilteredRooms(meetingRooms);
            setDateFilter(null);
          }}>
          <Text
            style={{
              color: 'red',
              marginLeft: 'auto',
              textDecorationLine: 'underline',
              fontSize:hp(2)
            }}>
            Clear Filters
          </Text>
        </TouchableOpacity>
        <View style={styles.searchContainer}>
          <View style={{width: '55%'}}>
            <Searchbar
              inputStyle={styles.inputStyle}
              placeholder="Search Meeting"
              value={searchQuery}
              onChangeText={onChangeSearch}
              style={{marginTop: 10, height:hp(5.7) , borderRadius :wp(3)}}
            />
          </View>
          <View style={{width: wp(42)}}>
            <TouchableOpacity style={styles.date} onPress={() => setOpen(true)}>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.dateInputText}>
                  {date !== null
                    ? date?.toDateString()
                    : new Date().toDateString()}
                </Text>
                <Image
                  style={{marginTop: wp(2.8), marginLeft: wp(5.5) , width:wp(3.5) , height:hp(2)}}
                  source={CALENDAR}
                />
              </View>
              <DatePicker
                modal
                open={open}
                date={date}
                onConfirm={newdate => {
                  setOpen(false);
                  setDate(newdate);
                  setDateFilter(newdate);
                }}
                onCancel={() => {
                  setOpen(false);
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <Text style={{marginTop: 10 , fontSize: hp(1.5)}}>Today: {userStore.auth.date}</Text>
        {filteredRooms != null && filteredRooms.length ? (
          <ScrollView
            style={{height: hp(75)}}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
              />
            }>
            {filteredRooms?.reverse().map((data: any) => {
              return (
                <View style={[styles.box, styles.shadowProp]} key={data.id}>
                  <TouchableOpacity
                    onPress={() => {
                      editMeeting(data);
                    }}>
                    <Image style={styles.editImg} source={EDIT} />
                  </TouchableOpacity>
                  <Text style={styles.nameHeading}>{data.title}</Text>
                  <Text style={styles.headings}>
                    {`${new Date(data.bookedTimeIn).toDateString()}`}
                  </Text>
                  <Text style={styles.headings}>
                    {`${moment(new Date(data.bookedTimeIn).toTimeString(), [
                      'HH.mm',
                    ]).format('hh:mm a')} - ${moment(
                      new Date(data.bookedTimeOut).toTimeString(),
                      ['HH.mm'],
                    ).format('hh:mm a')}`}
                  </Text>
                  <Text style={styles.headings}>
                    Confirmation Code:{data.code}
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      cancleMeeting(data.id);
                    }}>
                    <Text
                      style={[
                        styles.cancleMeeting,
                        {
                          color:
                            data.status === 'cancelled' ? 'red' : '#1d39c2',
                        },
                      ]}>
                      {data.status === 'cancelled'
                        ? 'Canceled Meeting'
                        : 'Cancel Meeting'}
                    </Text>
                  </TouchableOpacity>
                  <Text style={styles.invitees}>Invitees</Text>
                  <View style={styles.table}>
                    <View style={styles.tableData}>
                      <View style={styles.row}>
                        <Text style={styles.tableHeadings}>Name</Text>
                      </View>
                      <View style={styles.row}>
                        <Text style={styles.tableHeadings}>Email</Text>
                      </View>
                      <View style={styles.row}>
                        <Text style={styles.tableHeadings}>Status</Text>
                      </View>
                    </View>
                    {data.invitees?.map((invite: any) => {
                      return (
                        <View style={styles.tableData} key={invite.email}>
                          <View style={styles.row}>
                            <Text style={styles.tableDataHeadings}>
                              {invite.name ? invite.name : '-'}
                            </Text>
                          </View>
                          <View style={styles.row}>
                            <Text style={styles.tableDataHeadings}>
                              {invite.name ? invite.name : '-'}
                            </Text>
                          </View>
                          <View style={styles.row}>
                            <Text
                              style={[
                                styles.tableDataHeadings,
                                {
                                  color:
                                    invite.status === 'in_person'
                                      ? '#01620B'
                                      : invite.status === 'virtual'
                                      ? '#1339C2'
                                      : invite.status === 'declined'
                                      ? '#FF0000'
                                      : '#000000',
                                },
                              ]}>
                              {invite.status === 'in_person'
                                ? 'In Person'
                                : invite.status === 'virtual'
                                ? 'Virtual'
                                : invite.status === 'declined'
                                ? 'Declined'
                                : 'Pending'}
                            </Text>
                          </View>
                        </View>
                      );
                    })}
                  </View>
                </View>
              );
            })}
          </ScrollView>
        ) : (
          <View style={styles.noMeetings}>
            <Text style={styles.noMeetingsText}>No Meetings</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    alignItems: 'center',
  },
  container: {
    width: '95%',
    alignSelf: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  text: {
    marginTop: 50,
    padding: 80,
    textAlign: 'center',
    fontWeight: '500',
  },
  box: {
    width: wp(90),
    alignSelf: 'center',
    height: 'auto',
    backgroundColor: '#CFCBCB',
    borderWidth: 1,
    marginTop: 10,
    borderRadius: 8,
    borderColor: '#dddddd',
    overflow: 'hidden',
    marginBottom: hp(6),
  },
  shadowProp: {
    // shadowColor: '#171717',
  },

  searchContainer: {
    flexDirection: 'row',
  },
  inputStyle: {
    fontSize: wp(3.1),
  },
  date: {
    height: hp(5.7),
    width: '100%',
    marginTop: 10,
    borderWidth: 3,
    borderColor: '#dddddd',
    marginLeft: 10,
    borderRadius: wp(3),
  },
  dateInputText: {
    fontSize: wp(3.2),
    paddingTop: hp(1.5),
    marginLeft: wp(2.5),
  },
  nameHeading: {
    fontSize: wp(5),
    fontWeight: '700',
    color: 'black',
    paddingLeft: wp(4),
    paddingBottom: 8,
  },
  headings: {
    fontSize: wp(4),
    paddingLeft: wp(4),
    fontWeight: '700',
  },
  invitees: {
    fontSize: wp(5),
    paddingLeft: 15,
    paddingTop: 15,
    fontWeight: '700',
  },
  row: {
    borderWidth: 1,
    borderColor: '#B9B9B9',
    width: '31%',
  },
  table: {
    justifyContent: 'center',
    width: '100%',
    paddingTop: 10,
    paddingBottom: 20,
  },
  tableHeadings: {
    flexDirection: 'row',
    fontSize: wp(3),
    fontWeight: '700',
    textAlign: 'center',
    padding: 2,
  },
  tableData: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  tableDataHeadings: {
    fontSize: wp(2.2),
    textAlign: 'center',
  },
  cancleMeeting: {
    marginLeft: wp(2.5),
    fontSize:hp(1.8)
  },
  editImg: {
    justifyContent: 'flex-end',
    marginLeft: 'auto',
    padding: hp(1.1),
    marginRight: wp(3),
    marginTop: hp(0.9),
  },
  noMeetings: {
    alignSelf: 'center',
    marginTop: hp(25),
  },
  noMeetingsText: {
    fontSize: hp(3),
  },
});
export default observer(MyMeetings);
