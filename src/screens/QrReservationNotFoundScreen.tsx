/* eslint-disable react-native/no-inline-styles */
import {observer} from 'mobx-react';
import React from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import {Button} from 'react-native-paper';
import * as AddCalendarEvent from 'react-native-add-calendar-event';
import RNCalendarEvents from 'react-native-calendar-events';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useRootStoreContext} from '../Store';

function QrReservationNotFound(props: any) {
  const {userStore} = useRootStoreContext();

  async function handleBookNow() {
    const eventConfig: AddCalendarEvent.CreateOptions = {
      title: '',
      location: '',
    };
    const result = await AddCalendarEvent.presentEventCreatingDialog(
      eventConfig,
    );
    if (result.action === 'SAVED') {
      const {calendarItemIdentifier, eventIdentifier} = result;
      RNCalendarEvents.checkPermissions();
      RNCalendarEvents.findCalendars();
      const reservation = await RNCalendarEvents.findEventById(
        calendarItemIdentifier,
      );
      console.log('reservation:===>', reservation);

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
    } else {
      props.navigation.navigate('Init');
    }
  }

  return (
    <SafeAreaView style={styles.page}>
      <View style={styles.container}>
        <Text style={styles.textNotFound}>Booking Not Found</Text>
        <Text style={styles.text}>
          {`I am sorry ${userStore.auth.employee.name}.`}
          {'\n'}
          We don't have a confrimation for you.
        </Text>
        <Text style={styles.text}>
          Would you like to book it for now or later?
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          color={'#4299E1'}
          labelStyle={styles.buttonText}
          style={{width: '43%', borderRadius: 20}}
          mode="contained"
          onPress={() => {
            handleBookNow();
          }}>
          Book Now
        </Button>
        <Button
          color={'#4299E1'}
          labelStyle={styles.buttonText}
          style={{width: '43%', borderRadius: 20}}
          mode="contained"
          onPress={() => {
            handleBookNow();
          }}>
          Book For later
        </Button>
      </View>
      <Text style={{marginTop: 'auto', marginBottom: 10}}>
        Powered by MyLobby.co
      </Text>
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
  text: {
    padding: 15,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '700',
    color: 'black',
  },
  textNotFound: {
    textAlign: 'center',
    fontSize: hp(4),
    width: wp(75),
    color: '#1339C2',
  },
  container: {
    marginTop: hp(20),
    width: '70%',
  },
  bookedIcon: {width: 110, height: 110},
  buttonText: {
    color: 'white',
    width: '100%',
    fontSize: 15,
    paddingVertical: 10,
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  button: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: hp(2.5),
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: wp(100),
    marginTop: hp(10),
  },
});
export default observer(QrReservationNotFound);
