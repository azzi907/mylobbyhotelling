/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import {Button} from 'react-native-paper';
import Store from '../Store';
import * as RNLocalize from 'react-native-localize';

export default function BookNow(props: any) {
  const startDate = new Date(props.route.params.startDate);
  const endDate = new Date(props.route.params.endDate);
  console.log(props.route.params.endDate);
  const BACKEND_URL = Store.store.parameters.backendUrl;

  const bookNow = async () => {
    const requestOptions = {
      method: 'POST',

      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        name: Store.userStore.auth.employee.name,
        siteName: Store.userStore.auth.siteName,
        company: Store.userStore.auth.employee.company,
        phone: Store.userStore.auth.employee.phonesms,
        email: Store.userStore.auth.employee.email,
        jobTitle: Store.userStore.auth.employee.jobTitle,
        isRoom: props.route.params.isRoom,
        isDesk: props.route.params.isDesk,
        isOffice: props.route.params.isOffice,
        bookingType: props.route.params.bookingType,
        siteId: Store.userStore.auth.siteId,
        accountId: Store.userStore.auth.employee.accountId,
        employeeId: Store.userStore.auth.employee.id,
        roomId: props.route.params.roomId,
        roomName: props.route.params.roomName,
        bookedTimeIn: new Date(props.route.params.startDate).getTime(),
        bookedTimeOut: new Date(props.route.params.endDate).getTime(),
        timeZone: RNLocalize.getTimeZone(),
      }),
    };
    console.log('====================================');
    console.log(requestOptions);
    console.log('====================================');
    fetch(`${BACKEND_URL}/api/rooms_reservations/add`, requestOptions)
      .then(response => response.json())
      .then((result: any) => {
        console.log(result);
        props.navigation.navigate('Booked', {
          roomName: props.route.params.roomName,
          roomId: props.route.params.roomId,
          date: props.route.params.date,
          startDate: startDate.toString(),
          endDate: endDate.toString(),
          evCode: result?.reservation?.code,
        });
      })
      .catch(error => {
        console.log(
          'Store.userStore.auth.employee.name ===>',
          Store.userStore.auth.employee.name,
        );
        console.log(error);
      });
  };

  return (
    <SafeAreaView style={styles.page}>
      <View style={styles.container}>
        <Text style={styles.text}>{Store.userStore.auth.employee.name},</Text>
        <Text style={styles.text}>
          You have selected {props.route.params.roomName}
        </Text>
        <Text style={styles.text}>Start: {startDate.toString()}</Text>
        <Text style={styles.text}>To: {endDate.toString()}</Text>
      </View>
      <View style={styles.button}>
        <Button
          color={'#4299E1'}
          labelStyle={styles.buttonText}
          style={{width: '40%', borderRadius: 20}}
          mode="contained"
          onPress={() =>
            props.navigation.navigate('SelectViews', {
              ...props.route.params,
            })
          }>
          Modify
        </Button>
        <Button
          color={'#4299E1'}
          labelStyle={styles.buttonText}
          style={{width: '40%', borderRadius: 20}}
          mode="contained"
          onPress={async () => bookNow()}>
          Book Now
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
    padding: 40,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '700',
    color: 'black',
  },
  buttonText: {
    color: 'white',
    width: '100%',
    fontSize: 15,
    paddingVertical: 10,
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  button: {
    marginTop: 15,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  container: {
    marginTop: 50,
    padding: 5,
  },
});
