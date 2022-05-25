/* eslint-disable react-native/no-inline-styles */
import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';

export default function ReservationScreen(props: any) {
  const reservation = JSON.parse(props.route.params.reservation);
  console.log('====================================');
  console.log('params on reserve screen =>', props.route.params);
  console.log('====================================');
  useEffect(() => {
    setTimeout(() => {
      console.log('====================================');
      console.log('after 3 seconds');
      console.log('====================================');
      props.navigation.navigate('Booking');
    }, 3000);
  }, []);

  return (
    <View style={styles.page}>
      <Text style={{textAlign: 'center', fontSize: 20, marginTop: 80}}>
        {reservation.name} you are now booked
      </Text>
      <Text style={{textAlign: 'center', fontSize: 20, marginTop: 60}}>
        From {new Date(reservation.bookedTimeIn).toString()}
      </Text>
      <Text style={{textAlign: 'center', fontSize: 20, marginTop: 60}}>
        To {new Date(reservation.bookedTimeOut).toString()}
      </Text>
    </View>
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
});
