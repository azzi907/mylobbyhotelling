/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ToastAndroid,
  SafeAreaView,
} from 'react-native';
import React, {useState} from 'react';
import {useRootStoreContext} from '../Store';
import {Button, Modal, Portal, TextInput} from 'react-native-paper';
import * as AddCalendarEvent from 'react-native-add-calendar-event';
import RNCalendarEvents from 'react-native-calendar-events';
import {observer} from 'mobx-react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

function BookingScreen(props: any) {
  const {store, userStore} = useRootStoreContext();
  const BACKEND_URL = store.parameters.backendUrl;
  const [visible, setVisible] = useState(false);
  const [ical, setiIcal] = useState('');
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const LOGOUT_IMG = require('../../images/logout-image.png');
  const QR_CODE = require('../../images/qr-code-image.png');
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  React.useEffect(() => {
    const date = new Date();
    const month = months[date.getMonth()];
    const day = days[date.getDay()];
    const dateNum = date.getDate();
    const year = date.getFullYear();
    const dateString = day + ' ' + dateNum + ' ' + month + ' ' + year;
    userStore.update('date', dateString);
  }, []);

  const saveIcal = async () => {
    const requestOptions = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: userStore.auth.employee.id,
        accountId: userStore.auth.employee.accountId,
        ical: ical,
      }),
    };
    console.log('====================================');
    console.log(requestOptions);
    console.log('====================================');
    fetch(`${BACKEND_URL}/api/employees/saveical`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.success) {
          setVisible(false);
        }
      })
      .catch(error => {
        ToastAndroid.show('Error saving ical', ToastAndroid.LONG);
      });
  };

  function logout() {
    userStore.update('site', {});
    userStore.update('employee', {});
    userStore.update('logout', true);
    props.navigation.navigate('Init');
  }
  async function calenderEvent(
    bookingType: string,
    isRoom: boolean,
    isOffice: boolean,
    isDesk: boolean,
  ) {
    try {
      const eventConfig: AddCalendarEvent.CreateOptions = {
        title: '',
        location: '',
      };
      const result = await AddCalendarEvent.presentEventCreatingDialog(
        eventConfig,
      );
      console.log(result);

      if (result.action === 'SAVED') {
        const {calendarItemIdentifier, eventIdentifier} = result;
        RNCalendarEvents.checkPermissions();
        RNCalendarEvents.findCalendars();
        const reservation = await RNCalendarEvents.findEventById(
          calendarItemIdentifier,
        );
        const invitees = reservation?.attendees?.slice(1);
        props.navigation.navigate('SelectViews', {
          startDate: reservation?.startDate,
          endDate: reservation?.endDate,
          title: reservation?.title,
          location: reservation?.location,
          notes: reservation?.description,
          invitees: invitees,
          bookingType: bookingType,
          isRoom: isRoom,
          isOffice: isOffice,
          isDesk: isDesk,
          meetingId: calendarItemIdentifier,
        });
      } else {
        props.navigation.navigate('Init');
      }
    } catch (error) {
      console.log('WHAT');
      console.log(error);
    }
  }

  return (
    <SafeAreaView style={styles.page}>
      <Text style={styles.welcome}>Hi, {userStore.auth.employee.name}</Text>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={styles.modalContainer}>
          <Text>Add your ical link</Text>
          <TextInput
            style={{width: '100%', height: 50, marginTop: 25}}
            label="Ical"
            value={ical}
            onChangeText={text => setiIcal(text)}
          />
          <View style={styles.row}>
            <Button
              color={'#4299E1'}
              labelStyle={{...styles.buttonText, width: 80}}
              style={{borderRadius: 20, marginTop: 15}}
              mode="contained"
              onPress={hideModal}>
              Cancel
            </Button>
            <Button
              color={'#4299E1'}
              labelStyle={{...styles.buttonText, width: 80}}
              style={{borderRadius: 20, marginTop: 15}}
              mode="contained"
              onPress={() => saveIcal()}>
              Add
            </Button>
          </View>
        </Modal>
      </Portal>
      <Text
        style={{
          ...styles.welcome,
          fontSize: 20,
          paddingHorizontal: 10,
          textAlign: 'center',
        }}>
        Welcome to{' '}
        <Text style={{fontWeight: 'bold'}}>
          {userStore.auth.sites[0]?.name}
        </Text>{' '}
        Room Booking
      </Text>
      <Image
        source={{
          uri: `${BACKEND_URL}/api/sites/getLogo/${userStore.auth.sites[0]?.id}?small=true`,
        }}
        style={styles.companyLogo}
      />
      <Button
        color={'#4299E1'}
        labelStyle={styles.buttonText}
        style={{borderRadius: 20, marginTop: 10}}
        mode="contained"
        onPress={() =>
          calenderEvent('Booked Meeting Desk', false, false, true)
        }>
        Book Hot Desk
      </Button>
      <Button
        color={'#4299E1'}
        labelStyle={styles.buttonText}
        style={{borderRadius: 20, marginTop: 15}}
        mode="contained"
        onPress={() =>
          calenderEvent('Booked Private Office', false, true, false)
        }>
        Book Private Office
      </Button>
      <Button
        color={'#4299E1'}
        labelStyle={styles.buttonText}
        style={{borderRadius: 20, marginTop: 15}}
        mode="contained"
        onPress={() =>
          calenderEvent('Booked Meeting Room', true, false, false)
        }>
        Book Meeting Room
      </Button>
      <View style={styles.logout}>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('QrScreen');
          }}>
          <Image style={styles.logoutImg} source={QR_CODE} />
          <Text
            style={styles.text}>
            SCAN QR
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            logout();
          }}>
          <Image style={styles.logoutImg} source={LOGOUT_IMG} />
          <Text
            style={styles.text}>
            LOG OUT
          </Text>
        </TouchableOpacity>
      </View>
      {/* <Text style={{marginTop: 'auto', marginBottom: 10}}>
        Powered by MyLobby.co
      </Text> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  welcome: {
    marginTop: 50,
    fontSize: 25,
  },
  companyLogo: {
    width: wp(30),
    height: hp(25),
    marginTop: hp(2),
  },
  buttonText: {
    color: 'white',
    width: '70%',
  },
  icalButton: {
    width: 100,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    borderRadius: 20,
    top: 25,
    right: 10,
    backgroundColor: '#4299E1',
  },
  row: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  modalContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '80%',
    height: 200,
    alignSelf: 'center',
    backgroundColor: 'white',
    padding: 20,
  },
  logout: {
    marginTop: 'auto',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: hp(2),
    textAlign: 'center',
  },
  logoutImg: {
    width: hp(7),
    height: hp(7),
  },
  text:{
    textAlign: 'center',
    fontSize: wp(2.5),
    fontWeight: '700',
    color: '#1C8ADB',
    marginTop: 10,
  }
});

export default observer(BookingScreen);
