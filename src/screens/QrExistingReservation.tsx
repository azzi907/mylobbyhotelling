/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, SafeAreaView, ToastAndroid} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import * as RNLocalize from 'react-native-localize';
import {useRootStoreContext} from '../Store';
import {observer} from 'mobx-react-lite';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
function BookNow(props: any) {
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const {store, userStore} = useRootStoreContext();
  const BACKEND_URL = store.parameters.backendUrl;
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    if (name === '' || code === '') {
      return;
    }
    setIsDisabled(false);
  }, [name, code]);

  const handleSignIn = () => {
    const requestOptions = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        code: code,
      }),
    };
    fetch(
      `${BACKEND_URL}/api/rooms_reservations/getReservation`,
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        if (result) {
          const requestOptions = {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          };
          fetch(
            `${BACKEND_URL}/api/rooms_reservations/signIn/${result.reservation.id}`,
            requestOptions,
          )
            .then(response => response.json())
            .then(result => {
              if (result) {
                props.navigation.navigate('QrReservationLogIn', {
                  evCode: result.reservation.code,
                  startDate: result.reservation.bookedTimeIn,
                  endDate: result.reservation.bookedTimeOut
                });
              }
            })
            .catch(error => {
              console.log(error);
              ToastAndroid.show(
                'Error Finding Reservation ',
                ToastAndroid.LONG,
              );
            });
        }
      })
      .catch(error => {
        console.log(error);
        props.navigation.navigate('QrReservationNotFound', {
          ...props.route.params,
        });
      });
  };
  return (
    <SafeAreaView style={styles.page}>
      <View style={styles.conatiner}>
        <Text style={styles.text}>
          Enter Your Name and EV code of your Reservation
        </Text>
      </View>
      <View style={styles.inputField}>
        <TextInput
          mode="outlined"
          label="Name"
          value={name}
          selectionColor={'black'}
          keyboardType={'email-address'}
          outlineColor={'blue'}
          right={<TextInput.Icon name="mail" color={'#03A9F4'} />}
          onChangeText={text => setName(text)}
        />
      </View>
      <View style={styles.inputField}>
        <TextInput
          mode="outlined"
          label="Ev Code"
          value={code}
          selectionColor={'black'}
          keyboardType={'email-address'}
          outlineColor={'blue'}
          right={<TextInput.Icon name="mail" color={'#03A9F4'} />}
          onChangeText={text => setCode(text)}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          color={'#4299E1'}
          labelStyle={styles.buttonText}
          style={{width: '43%', borderRadius: 20}}
          mode="contained"
          onPress={() => {
            handleSignIn();
          }}>
          Back
        </Button>
        <Button
          disabled={isDisabled}
          color={'#4299E1'}
          labelStyle={styles.buttonText}
          style={{width: '43%', borderRadius: 20}}
          mode="contained"
          onPress={() => {
            handleSignIn();
          }}>
          Next
        </Button>
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
  text: {
    textAlign: 'center',
    fontSize: hp(4),
    width: widthPercentageToDP(75),
    color: '#1339C2',
  },
  conatiner: {
    marginTop: hp(20),
  },
  inputField: {
    alignSelf: 'center',
    width: '80%',
    height: 40,
    marginTop: hp(4),
  },
  buttonContainer: {
    width: widthPercentageToDP(80),
    marginTop: hp(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonText: {
    color: 'white',
    width: '100%',
    fontSize: 15,
    paddingVertical: 10,
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});
export default observer(BookNow);
