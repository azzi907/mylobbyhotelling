import React from 'react';

import {StyleSheet, Text, Platform, ToastAndroid, Alert} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import {observer} from 'mobx-react-lite';
import * as AddCalendarEvent from 'react-native-add-calendar-event';
import RNCalendarEvents from 'react-native-calendar-events';

function QrScreen(props: any) {
  const onSuccess = async (e: any) => {
    if (e.data) {
      var resultt: any = {};
      var parts = e.data.split(',');
      for (var i = 0; i < parts.length; i++) {
        var subValues: any = parts[i].split(':');
        resultt[subValues[0]] = subValues[1].substring(0, subValues[1].length);
      }
      if (resultt.isDesk === true && resultt.isBlocked === true) {
        if (Platform.OS === 'android') {
          ToastAndroid.show(
            'This desk is Blocked due to Social Distancing',
            ToastAndroid.LONG,
          );
        } else {
          Alert.alert('This desk is Blocked due to Social Distancing');
        }
      } else {
        const bookingType =
          resultt.isDesk === true
            ? 'Booked Meeting Desk'
            : resultt.isRoom === true
            ? 'Booked Meeting Room'
            : 'Booked Meeting Office';

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
            bookingType: bookingType,
            isRoom: resultt.isRoom ? resultt.isRoom : false,
            isOffice: resultt.isOffice ? resultt.isOffice : false,
            isDesk: resultt.isDesk ? resultt.isDesk : false,
            meetingId: calendarItemIdentifier,
            isQrScanned: true,
            roomId: resultt.roomId
              ? resultt.roomId
              : resultt.OfficeId
              ? resultt.OfficeId
              : resultt.deskId,
            roomName: resultt.roomName
              ? resultt.roomName
              : resultt.officeName
              ? resultt.officeName
              : resultt.deskName,
          });
        }
      }
    }
  };
  return (
    <QRCodeScanner
      reactivate={true}
      reactivateTimeout={5000}
      onRead={onSuccess}
      topContent={<Text style={styles.centerText}>Scan Your QR CODE</Text>}
    />
  );
}

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 20,
    paddingTop: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '700',
    color: '#000',
  },
});
export default observer(QrScreen);
