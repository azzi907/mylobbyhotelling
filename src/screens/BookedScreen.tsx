/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, StyleSheet, SafeAreaView, Image} from 'react-native';
import Store from '../Store';

export default function Booked(props: any) {
  const BOOKED = require('../../images/check-mark.png');
  const callBack = () => {
    props.navigation.navigate('Booking');
  };
  setTimeout(callBack, 3000);
  return (
    <SafeAreaView style={styles.page}>
      <View style={styles.container}>
        <Text style={styles.text}>{Store.userStore.auth.employee.name}</Text>
        <Text style={styles.text}>
          You have selected {props.route.params.roomName}
        </Text>
        <Text style={styles.text}>Start: {props.route.params.startDate}</Text>
        <Text style={styles.text}>To: {props.route.params.startDate}</Text>
        <Text style={styles.text}>
          Confirmation Code: {props.route.params.evCode}
        </Text>
      </View>
      <Image style={styles.bookedIcon} source={BOOKED} />
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
  container: {
    marginTop: 50,
    width: '70%',
  },
  bookedIcon: {width: 110, height: 110},
});
