/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import {
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
} from 'react-native';
import React from 'react';
import {useRootStoreContext} from '../Store';
import {Button } from 'react-native-paper';
import * as AddCalendarEvent from 'react-native-add-calendar-event';
import RNCalendarEvents from 'react-native-calendar-events';
import {observer} from 'mobx-react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

function QrReservation(props: any) {
  const {store, userStore} = useRootStoreContext();
  const BACKEND_URL = store.parameters.backendUrl; 

  async function bookNow() {
    const eventConfig: AddCalendarEvent.CreateOptions = {
      title: '',
      location: '',
    };
    const result = await AddCalendarEvent.presentEventCreatingDialog(
      eventConfig,
    );
    if (result.action === 'SAVED') {
      const {calendarItemIdentifier} = result;
      RNCalendarEvents.checkPermissions();
      RNCalendarEvents.findCalendars();
      const reservation = await RNCalendarEvents.findEventById(
        calendarItemIdentifier,
      );
      const invitees = reservation?.attendees?.slice(1);

      props.navigation.navigate('BookNow', {
        startDate: reservation?.startDate,
        endDate: reservation?.endDate,
        title: reservation?.title,
        location: reservation?.location,
        notes: reservation?.description,
        invitees: invitees,
        bookingType: props.route.params.bookingType,
        isRoom: props.route.params.QrData.isRoom
          ? props.route.params.QrData.isRoom
          : false,
        isOffice: props.route.params.QrData.isOffice
          ? props.route.params.QrData.isOffice
          : false,
        isDesk: props.route.params.QrData.isDesk
          ? props.route.params.QrData.isDesk
          : false,
        meetingId: calendarItemIdentifier,
        isQrScanned: true,
        roomId: props.route.params.QrData.roomId
          ? props.route.params.QrData.roomId
          : props.route.params.QrData.OfficeId
          ? props.route.params.QrData.OfficeId
          : props.route.params.QrData.deskId,
        roomName: props.route.params.QrData.roomName
          ? props.route.params.QrData.roomName
          : props.route.params.QrData.officeName
          ? props.route.params.QrData.officeName
          : props.route.params.QrData.deskName,
      });
    }
  }
  return (
    <SafeAreaView style={styles.page}>
      <Text style={styles.welcome}>Hi, {userStore.auth.employee.name}</Text>
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
      <Text style={styles.selectOne}>Select one of the following:</Text>
      <Button
        color={'#4299E1'}
        labelStyle={styles.buttonText}
        style={{borderRadius: 20, marginTop: 15}}
        mode="contained"
        onPress={() => {
          bookNow();
        }}>
        {`Reserve This ${
          props.route.params.bookingType === 'Booked Meeting Desk'
            ? 'Desk'
            : 'Booked Meeting Room'
            ? 'Room'
            : 'Booked Meeting Office'
            ? 'Office'
            : ''
        }`}
      </Button>
      <Button
        color={'#4299E1'}
        labelStyle={styles.buttonText}
        style={{borderRadius: 20, marginTop: 15}}
        mode="contained"
        onPress={() => props.navigation.navigate('QrExistingReservation', {...props.route.params})}>
        Sign In
      </Button>
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
    marginTop: hp(5),
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
  text: {
    textAlign: 'center',
    fontSize: wp(2.5),
    fontWeight: '700',
    color: '#1C8ADB',
    marginTop: 10,
  },
  selectOne: {
    fontSize: wp(5),
    fontWeight: '700',
    marginTop: hp(2),
  },
});

export default observer(QrReservation);
