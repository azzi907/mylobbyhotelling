/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ToastAndroid,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';
import ImageMapper from '../components/ImageMapper';
import {useRootStoreContext} from '../Store';
import {Searchbar} from 'react-native-paper';
import {observer} from 'mobx-react-lite';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import DatePicker from 'react-native-date-picker';
import {useIsFocused} from '@react-navigation/native';
import {useEffect} from 'react';
import moment from 'moment';

function FindAColleague(this: any, props: any) {
  const {store, userStore} = useRootStoreContext();
  const CALENDAR = require('../../images/calendar-icon.png');
  const BACK_ICON = require('../../images/back-icon.png');
  const USER_ICON = require('../../images/userIcon.png');
  const CIRC_RED = require('../../images/circle-red.png');

  const BACKEND_URL = store.parameters.backendUrl;
  const [area, setArea] = React.useState<any>({});
  const [floorPlan, setFloorPlan] = React.useState<any>(null);
  const [rooms, setRooms] = useState<any>();
  const [employees, setEmployees] = useState<any>(null);
  const [reservations, setReservations] = useState<any>(null);
  const [employeeId, setEmployeeId] = useState<any>(null);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [date, setDate] = useState(new Date());
  const [dateFilter, setDateFilter] = useState<any>(null);
  const [open, setOpen] = useState(false);
  const [popUp, setpopUp] = useState(false);
  const [filteredReservation, setFilteredReservation] = useState<any>();

  const isFocused = useIsFocused();

  const getFloorPlan = async () => {
    const requestOptions = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: rooms.location,
      }),
    };
    fetch(`${BACKEND_URL}/api/floor_plans/list`, requestOptions)
      .then(response => response.json())
      .then(result => {
        const newfloorPlan = result.floorPlan;
        newfloorPlan.areaRN.forEach((ar: any) => {
          if (rooms.name === ar.name) {
            ar.fill = '#324fb650';
            ar.prefill = '#324fb650';
          } else {
            ar.fill = '#FF0000';
            ar.prefill = '#FF0000';
          }
        });
        setArea(newfloorPlan.areaRN);
        setFloorPlan(newfloorPlan);
      })
      .catch((error: any) => {
        console.log('floor plan exception =>', error);
        ToastAndroid.show('Error Getting Floor Plan', ToastAndroid.LONG);
      });
  };
  const getRooms = async (id: any) => {
    const requestOptions = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };
    fetch(`${BACKEND_URL}/api/rooms/${id}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        setRooms(result.room);
        getFloorPlan();
      })
      .catch(error => {
        console.log(error);
        ToastAndroid.show('Error saving ical', ToastAndroid.LONG);
      });
  };
  const getEmployees = async () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };
    fetch(
      `${BACKEND_URL}/api/employees/list?siteId=${userStore.auth.siteId}`,
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        setEmployees(result.employees);
      })
      .catch(error => {
        console.log(error);
        ToastAndroid.show('Error saving ical', ToastAndroid.LONG);
      });
  };
  const getReservations = async (id: any) => {
    const requestOptions = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        employeeId: id,
      }),
    };
    fetch(`${BACKEND_URL}/api/rooms_reservations/list`, requestOptions)
      .then(response => response.json())
      .then(result => {
        setReservations(result.reservations);
      })
      .catch(error => {
        console.log(error);
        ToastAndroid.show('Error saving ical', ToastAndroid.LONG);
      });
  };

  React.useEffect(() => {
    if (isFocused) {
      getEmployees();
    }
  }, [isFocused]);

  useEffect(() => {
    setEmployeeId(() => {
      if (searchQuery) {
        const filteredEmployee = employees.filter((element: any) => {
          return element.name.toLowerCase().includes(searchQuery.toLowerCase());
        });
        if (filteredEmployee.length) {
          return filteredEmployee[0].id;
        } else {
          return null;
        }
      } else {
        return null;
      }
    });
  }, [searchQuery]);
  function findEmployee() {
    if (dateFilter === null) {
      if (Platform.OS === 'android') {
        ToastAndroid.show('Please Select Date', ToastAndroid.LONG);
      } else {
        Alert.alert('Please Select Date');
      }
    }
    if (dateFilter) {
      if (reservations) {
        const newDate = new Date(dateFilter).setUTCSeconds(0);
        const filteredData = reservations.filter((element: any) => {
          const dateCheck = new Date(element.bookedTimeIn).setUTCSeconds(0);
          if (newDate === dateCheck) {
            return element;
          }
        });
        setFilteredReservation(filteredData[0]);
        if (filteredData.length) {
          getRooms(filteredData[0].roomId);
          return filteredData;
        } else {
          setFloorPlan(null);
          if (Platform.OS === 'android') {
            ToastAndroid.show('No Reservation Found', ToastAndroid.LONG);
          } else {
            Alert.alert('No Reservation Found');
          }
          return null;
        }
      } else {
        if (Platform.OS === 'android') {
          ToastAndroid.show('No Employee Found', ToastAndroid.LONG);
        } else {
          Alert.alert('No Employee Found');
        }
        return null;
      }
    }
  }
  useEffect(() => {
    if (employeeId) {
      getReservations(employeeId);
    }
  }, [employeeId]);

  function mainImgWasPressed(item: any) {
    if (item.fill === '#FF0000') {
      if (Platform.OS === 'android') {
        ToastAndroid.show('Blocked', ToastAndroid.LONG);
      } else {
        Alert.alert('Blocked');
      }
    } else if (item.fill === '#324fb650') {
      setpopUp(true);
    }
  }

  React.useEffect(() => {
    if (rooms) {
      getFloorPlan();
    }
  }, [rooms]);

  const onChangeSearch = (query: React.SetStateAction<string>) => {
    setSearchQuery(query);
  };

  useEffect(() => {
    if (popUp) {
      setTimeout(() => {
        setpopUp(false);
      }, 5000);
    }
  }, [popUp]);
  return (
    <SafeAreaView style={styles.page}>
      <View style={styles.container}>
        <View style={{display: 'flex', flexDirection: 'row', marginTop: 15}}>
          <TouchableOpacity
            style={{display: 'flex', flexDirection: 'row'}}
            onPress={() => {
              props.navigation.navigate('SelectViews', {...props.route.params});
            }}>
            <Image style={{marginTop: 3}} source={BACK_ICON} />
            <Text style={{color: '#51D1FA', marginLeft: 4}}>Back</Text>
          </TouchableOpacity>
          <Text
            style={{
              paddingTop: hp(3),
              paddingLeft: wp(7),
              fontWeight: '700',
              fontSize: hp(3.75),
            }}>
            Find A Colleague
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            setDate(new Date());
            setFloorPlan(null);
          }}>
          <Text
            style={{
              color: 'red',
              marginLeft: 'auto',
              textDecorationLine: 'underline',
            }}>
            Clear Filters
          </Text>
        </TouchableOpacity>
        <View style={{width: '98%'}}>
          <Searchbar
            inputStyle={styles.inputStyle}
            placeholder="Employee Name"
            value={searchQuery}
            onChangeText={onChangeSearch}
            style={{marginTop: 10, borderRadius: 10}}
          />
        </View>
        <View style={{marginTop: 5, flexDirection: 'row'}}>
          <View style={{width: wp(60)}}>
            <TouchableOpacity style={styles.date} onPress={() => setOpen(true)}>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.dateInputText}>
                  {date !== null
                    ? date?.toDateString()
                    : new Date().toDateString()}
                </Text>
                <Image style={styles.img} source={CALENDAR} />
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
          <TouchableOpacity
            onPress={() => {
              findEmployee();
            }}>
            <View style={styles.button}>
              <Text style={styles.btntext}>Find Colleague</Text>
            </View>
          </TouchableOpacity>
        </View>
        {popUp ? (
          <View style={styles.popUp}>
            <Text style={styles.desk}>{rooms.name}</Text>
            <Text style={styles.popUpText}>{filteredReservation.name}</Text>
            <Text style={styles.popUpText}>
              {new Date(filteredReservation.bookedTimeIn).toDateString()}
            </Text>
            <Text style={styles.popUpText}>
              {`${moment(
                new Date(filteredReservation.bookedTimeIn).toTimeString(),
                ['HH.mm'],
              ).format('hh:mm a')} - ${moment(
                new Date(filteredReservation.bookedTimeOut).toTimeString(),
                ['HH.mm'],
              ).format('hh:mm a')}`}
            </Text>
            <Text style={styles.popUpText}>{rooms.location}</Text>
          </View>
        ) : null}
        <View style={styles.floorPlanViewContainer}>
          {floorPlan?.file ? (
            <ScrollView horizontal={true}>
              <ScrollView
                nestedScrollEnabled
                showsVerticalScrollIndicator={false}>
                <ImageMapper
                  imgHeight={floorPlan.imageDim[1]}
                  imgWidth={floorPlan.imageDim[0]}
                  imgSource={`${BACKEND_URL}/resources/floorplans/${userStore.auth.employee.sites[0]}/${floorPlan.file}`}
                  imgMap={area}
                  onPress={(item: any) => {
                    mainImgWasPressed(item);
                  }}
                  containerStyle={{top: 10}}
                  selectedAreaId={'0'}
                />
              </ScrollView>
            </ScrollView>
          ) : (
            <View style={styles.noData}>
              <Text style={styles.noDataText}>
                No Data Available Please Select Filters
              </Text>
            </View>
          )}
        </View>
      </View>
      <View style={styles.box}>
        <Text style={{alignSelf: 'center', fontWeight: '600'}}>Legend</Text>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop: 5,
          }}>
          <View style={styles.legendDescription}>
            <Text style={styles.text}>Your Colleague</Text>
            <Image source={USER_ICON} style={styles.userContainer} />
          </View>
          <View style={styles.legendDescription}>
            <Text style={styles.text}>Other Users</Text>
            <Image style={styles.userContainerCirc} source={CIRC_RED} />
          </View>
        </View>
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
  shadowProp: {},
  floorPlan: {
    height: 400,
    width: '80%',
    alignSelf: 'center',
    marginTop: 30,
  },
  floorPlanView: {
    textDecorationLine: 'underline',
    color: '#51D1FA',
    fontSize: 15,
    fontWeight: '500',
  },
  box: {
    width: wp(80),
    height: hp(8),
    marginTop: 10,
    bottom: 0,
    borderWidth: 1,
  },
  legendDescription: {
    display: 'flex',
    flexDirection: 'row',
  },
  circle: {
    marginTop: 4,
    backgroundColor: 'yellow',
    width: 11,
    height: 11,
    borderRadius: 50,
  },
  date: {
    height: wp(12),
    marginTop: 10,
    borderWidth: 3,
    borderColor: '#dddddd',
    borderRadius: 8,
    textAlign: 'center',
  },
  dateText: {
    fontSize: hp(3.8),
    padding: hp(4),
    textAlign: 'center',
  },
  dateInputText: {
    fontSize: wp(4),
    paddingTop: wp(2.8),
    marginLeft: wp(5),
  },
  img: {
    marginLeft: 'auto',
    marginRight: 10,
    padding: 10,
    marginTop: 10,
  },
  inputStyle: {
    fontSize: wp(5),
  },
  button: {
    height: wp(12),
    backgroundColor: '#2F8AF5',
    width: wp(32),
    marginLeft: wp(2.5),
    marginTop: 10,
    borderRadius: 10,
  },
  btntext: {
    fontSize: wp(3.8),
    textAlign: 'center',
    color: 'white',
    fontWeight: '700',
    marginTop: wp(3.7),
  },
  popUp: {
    borderWidth: 0.2,
    position: 'absolute',
    alignSelf: 'center',
    marginTop: hp(45),
    height: hp(17),
    width: wp(45),
    backgroundColor: '#E6E6E6',
    opacity: 0.9,
    zIndex: 11111,
    padding: 5,
  },
  desk: {
    fontSize: hp(2),
    fontWeight: '700',
    padding: 6,
  },
  popUpText: {
    fontSize: hp(1.9),
    paddingLeft: 6,
    fontWeight: '500',
  },
  noData: {
    alignSelf: 'center',
    marginTop: hp(25),
  },
  noDataText: {
    fontSize: hp(2),
  },
  floorPlanViewContainer: {
    height: hp(49),
    width: wp(95),
  },
  text: {
    fontSize: wp(2.7),
    fontWeight: '600',
    lineHeight: wp(7),
  },
  userContainer: {
    width: wp(8),
    height: hp(4),
  },
  userContainerCirc: {
    width: wp(5.7),
    height: hp(2.9),
    marginLeft: 5,
    marginTop: 5,
  },
});
export default observer(FindAColleague);
