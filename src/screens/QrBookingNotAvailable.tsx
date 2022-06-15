import {observer} from 'mobx-react';
import React from 'react';
import {View, Text, StyleSheet, SafeAreaView, Image} from 'react-native';
import {Button} from 'react-native-paper';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {useRootStoreContext} from '../Store';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

function QrBookingNotAvailable(props: any) {
  const {userStore} = useRootStoreContext();

  return (
    <SafeAreaView style={styles.page}>
      <View style={styles.container}>
        <Text style={styles.textBlue}>Booking Not Available</Text>
        <Text style={styles.text}>
          I am Sorry {userStore.auth.employee.name}. {'\n'} It is Booked at{' '}
          {'\n'} the time you Selected{' '}
        </Text>
        <Text style={styles.text}>
          Do you want to see what {'\n'} other desks are available?
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          color={'#4299E1'}
          labelStyle={styles.buttonText}
          style={{width: '43%', borderRadius: 20}}
          mode="contained"
          onPress={() => {
            props.navigation.navigate('Booking');
          }}>
          Yes
        </Button>
        <Button
          color={'#4299E1'}
          labelStyle={styles.buttonText}
          style={{width: '43%', borderRadius: 20}}
          mode="contained"
          onPress={() => {
            props.navigation.navigate('Booking');
          }}>
          No
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
  container: {
    marginTop: hp(20),
    width: '100%',
  },
  bookedIcon: {width: 110, height: 110},
  textBlue: {
    textAlign: 'center',
    fontSize: hp(4),
    width: wp(100),
    color: '#1339C2',
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
export default observer(QrBookingNotAvailable);
