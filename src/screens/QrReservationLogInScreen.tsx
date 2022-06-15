/* eslint-disable react-native/no-inline-styles */
import {observer} from 'mobx-react';
import React from 'react';
import {View, Text, StyleSheet, SafeAreaView, Image} from 'react-native';
import {useRootStoreContext} from '../Store';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

function QrReservationLogIn(props: any) {
  const {userStore} = useRootStoreContext();
  const BOOKED = require('../../images/check-mark.png');
  console.log("props ===>" , props.route.params);
  
  const callBack = () => {
    props.navigation.navigate('Booking');
  };
  setTimeout(callBack, 3000);
  return (
    <SafeAreaView style={styles.page}>
      <View style={styles.container}>
        <Text style={styles.text}>{`Hi ${userStore.auth.employee.name}, ${'\n'} You are Signed In.`}</Text>
        <Text style={styles.text}>{`Start: ${new Date(props.route.params.startDate)}`}</Text>
        <Text style={styles.text}>{`Start: ${new Date(props.route.params.endDate)}`}</Text>
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
    marginTop: hp(20),
    width: '70%',
  },
  bookedIcon: {width: 110, height: 110},
});
export default observer(QrReservationLogIn);
