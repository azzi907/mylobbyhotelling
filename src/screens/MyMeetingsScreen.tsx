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
} from 'react-native';
import {useRootStoreContext} from '../Store';
import {Searchbar} from 'react-native-paper';
import DatePicker from 'react-native-date-picker';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {observer} from 'mobx-react';

function MyMeetings(props: any) {
  const {store, userStore} = useRootStoreContext();

  const BACK_ICON = require('../../images/back-icon.png');
  const EDIT = require('../../images/edit.png');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const CALENDAR = require('../../images/calendar-icon.png');

  const [meetingRooms, setMeetingRooms] = useState<any>(null);
  const BACKEND_URL = store.parameters.backendUrl;

  const getMeetings = async () => {
    const requestOptions = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        employeeId: userStore.auth.employee.id,
      }),
    };
    fetch(`${BACKEND_URL}/api/rooms_reservations/meetings`, requestOptions)
      .then(response => response.json())
      .then(result => {
        setMeetingRooms(result);
      })
      .catch(error => {
        console.log(error);
        ToastAndroid.show('Error fetching meeting rooms', ToastAndroid.LONG);
      });
  };
  useEffect(() => {
    getMeetings();
  }, []);
  const onChangeSearch = (query: React.SetStateAction<string>) => {
    setSearchQuery(query);
  };
  console.log('Meeting Rooms===>', meetingRooms);

  return (
    <SafeAreaView style={styles.page}>
      <View style={styles.container}>
        <View style={{flexDirection: 'row', marginTop: 15}}>
          <TouchableOpacity
            style={{display: 'flex', flexDirection: 'row'}}
            onPress={() => {
              props.navigation.navigate('SelectViews', {...props.route.params});
            }}>
            <Image style={{marginTop: 3}} source={BACK_ICON} />
            <Text style={{color: '#51D1FA', marginLeft: 4}}>Back</Text>
          </TouchableOpacity>
        </View>

        <Text
          style={{alignSelf: 'center', fontWeight: '700', fontSize: hp(3.75)}}>
          My Meetings
        </Text>
        <View style={styles.searchContainer}>
          <View style={{width: '55%'}}>
            <Searchbar
              inputStyle={styles.inputStyle}
              placeholder="Search Meeting"
              value={searchQuery}
              onChangeText={onChangeSearch}
              style={{marginTop: 10, borderRadius: 10}}
            />
          </View>
          <View style={{width: '43%'}}>
            <TouchableOpacity style={styles.date} onPress={() => setOpen(true)}>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.dateInputText}>
                  {date.toDateString() !== null ? date.toDateString() : 'Date:'}
                </Text>
                <Image
                  style={{marginTop: 12, marginLeft: 15}}
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
                }}
                onCancel={() => {
                  setOpen(false);
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <Text style={{marginTop: 10}}>Today:</Text>
        <ScrollView
          style={{height: hp(75)}}
          showsVerticalScrollIndicator={false}>
          {meetingRooms?.map(data => {
            return (
              <View style={[styles.box, styles.shadowProp]}>
                <TouchableOpacity>
                  <Image style={styles.editImg} source={EDIT} />
                </TouchableOpacity>
                <Text style={styles.nameHeading}>OaksWill</Text>
                <Text style={styles.headings}>11:00 Am - 12:00 PM</Text>
                <Text style={styles.headings}>
                  Confirmation Code: EV 00-1000
                </Text>
                <TouchableOpacity>
                  <Text style={styles.cancleMeeting}>Cancle Meeting ?</Text>
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
                  <View style={styles.tableData}>
                    <View style={styles.row}>
                      <Text style={styles.tableDataHeadings}>
                        Rhonda Elliot
                      </Text>
                    </View>
                    <View style={styles.row}>
                      <Text style={styles.tableDataHeadings}>
                        RhondaElliot@gmail.com
                      </Text>
                    </View>
                    <View style={styles.row}>
                      <Text style={styles.tableDataHeadings}>In Person</Text>
                    </View>
                  </View>
                </View>
              </View>
            );
          })}
        </ScrollView>
      </View>
      {/* <Text style={{marginTop: 'auto'}}>Powered by MyLobby.co</Text> */}
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
    marginTop: 20,
    borderRadius: 8,
    borderColor: '#dddddd',
    overflow: 'hidden',
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
    height: hp(7),
    width: '100%',
    marginTop: 10,
    borderWidth: 3,
    borderColor: '#dddddd',
    marginLeft: 10,
    borderRadius: 8,
  },
  dateText: {
    fontSize: wp(3.5),
    padding: hp(1.5),
  },
  dateInputText: {
    fontSize: hp(1.75),
    paddingTop: hp(1.5),
    marginLeft: wp(2.5),
  },
  nameHeading: {
    fontSize: wp(5),
    fontWeight: '700',
    color: 'black',
    padding: 8,
  },
  headings: {
    fontSize: wp(4.5),
    paddingLeft: 8,
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
    padding: hp(0.5),
  },
  cancleMeeting: {
    color: '#1d39c2',
    marginLeft: wp(2.5),
  },
  editImg: {
    justifyContent: 'flex-end',
    marginLeft: 'auto',
    padding: hp(1.1),
    marginRight: wp(2),
    marginTop: hp(0.5),
  },
});
export default observer(MyMeetings);
