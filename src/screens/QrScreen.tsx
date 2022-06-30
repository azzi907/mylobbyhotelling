import React from 'react';

import {StyleSheet, Text, Platform, ToastAndroid, Alert} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import {observer} from 'mobx-react-lite';
import {useRootStoreContext} from '../Store';

function QrScreen(props: any) {
  const {store, userStore} = useRootStoreContext();

  const onSuccess = async (e: any) => {
    if (e.data) {
      var resultt: any = {};
      var parts = e.data.split(',');
      for (var i = 0; i < parts.length; i++) {
        var subValues: any = parts[i].split(':');
        resultt[subValues[0]] = subValues[1].substring(0, subValues[1].length);
      }
      if (userStore.auth.employee.category === 'C') {
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
          setTimeout(() => {
            const bookingType =
              resultt.isDesk === true
                ? 'Booked Meeting Desk'
                : resultt.isRoom === true
                ? 'Booked Meeting Room'
                : 'Booked Meeting Office';
            props.navigation.navigate('QrReservation', {
              QrData: resultt,
              bookingType: bookingType,
            });
          }, 1000);
        }
      } else if (userStore.auth.employee.category === 'A') {
        if (userStore.auth.employee.category === resultt.category) {
          setTimeout(() => {
            const bookingType =
              resultt.isDesk === true
                ? 'Booked Meeting Desk'
                : resultt.isRoom === true
                ? 'Booked Meeting Room'
                : 'Booked Meeting Office';
            props.navigation.navigate('QrReservation', {
              QrData: resultt,
              bookingType: bookingType,
            });
          }, 1000);
        } else {
          if (Platform.OS === 'android') {
            ToastAndroid.show(
              'Only Available for Executives ',
              ToastAndroid.LONG,
            );
          } else {
            Alert.alert('Only Available for Executives ');
          }
        }
      } else {
        if (resultt.category === 'B' || resultt.category === 'A') {
          setTimeout(() => {
            const bookingType =
              resultt.isDesk === true
                ? 'Booked Meeting Desk'
                : resultt.isRoom === true
                ? 'Booked Meeting Room'
                : 'Booked Meeting Office';
            props.navigation.navigate('QrReservation', {
              QrData: resultt,
              bookingType: bookingType,
            });
          }, 1000);
        } else {
          if (Platform.OS === 'android') {
            ToastAndroid.show(
              'Only Available for Executives ',
              ToastAndroid.LONG,
            );
          } else {
            Alert.alert('Only Available for Executives ');
          }
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
