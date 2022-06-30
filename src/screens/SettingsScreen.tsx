/* eslint-disable react-native/no-inline-styles */
import {observer} from 'mobx-react';
import React from 'react';
import {View, Text, StyleSheet, SafeAreaView, Image} from 'react-native';
import {useRootStoreContext} from '../Store';

function Settings(props: any) {
  const {userStore} = useRootStoreContext();

  const BOOKED = require('../../images/check-mark.png');
  const callBack = () => {
    props.navigation.navigate('Booking');
  };

  return (
    <SafeAreaView style={styles.page}>
      <View style={styles.container}>
        <Text style={styles.text}>{userStore.auth.employee.name}</Text>
        <Text style={styles.text}>
          You have selected 
        </Text>
        <Text style={styles.text}>Start</Text>
        <Text style={styles.text}>To:</Text>
        <Text style={styles.text}>
          Confirmation Code: 
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
export default observer(Settings);
