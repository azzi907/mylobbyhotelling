/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import {Button} from 'react-native-paper';
import * as RNLocalize from 'react-native-localize';
import {useRootStoreContext} from '../Store';
import {observer} from 'mobx-react-lite';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
function BookNow(props: any) {
  const [invitees, setInvitees] = useState(null);
  const {store, userStore} = useRootStoreContext();
  const startDate = new Date(props.route.params.startDate);
  const endDate = new Date(props.route.params.endDate);
  const BACKEND_URL = store.parameters.backendUrl;
  useEffect(() => {
    const inviteees = props.route.params.invitees;
    var arr: any = [];
    if (inviteees) {
      inviteees.map((i: any) => {
        arr.push({name: i.name, email: i.email});
      });
      setInvitees(arr);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log('Params ==>', props.route.params);

  const bookNow = async () => {
    const requestOptions = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: userStore.auth.employee.name,
        title: props.route.params.title,
        invitees: invitees,
        location: props.route.params.location,
        siteName: userStore.auth.sites[0]?.name,
        company: userStore.auth.employee.company,
        phone: userStore.auth.employee.phonesms,
        email: userStore.auth.employee.email,
        jobTitle: userStore.auth.employee.jobTitle,
        isRoom: props.route.params.isRoom,
        isDesk: props.route.params.isDesk,
        isOffice: props.route.params.isOffice,
        bookingType: props.route.params.bookingType,
        siteId: userStore.auth.siteId,
        accountId: userStore.auth.employee.accountId,
        employeeId: userStore.auth.employee.id,
        roomId: props.route.params.roomId,
        roomName: props.route.params.roomName,
        bookedTimeIn: new Date(props.route.params.startDate).getTime(),
        bookedTimeOut: new Date(props.route.params.endDate).getTime(),
        timeZone: RNLocalize.getTimeZone(),
        meetingId: props.route.params.meetingId,
      }),
    };
    console.log('request Options', requestOptions);

    fetch(`${BACKEND_URL}/api/rooms_reservations/add`, requestOptions)
      .then(response => response.json())
      .then((result: any) => {
        console.log('result reservation===>', result);

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
        console.log(error);
      });
  };
  return (
    <SafeAreaView style={styles.page}>
      <View style={styles.container}>
        <Text style={styles.text}>{userStore.auth.employee.name},</Text>
        <Text style={styles.text}>
          You have selected {props.route.params.roomName}
        </Text>
        <Text style={styles.text}>Start: {startDate.toString()}</Text>
        <Text style={styles.text}>To: {endDate.toString()}</Text>
      </View>
      <View style={styles.button}>
        {props.route.params.isQrScanned !== true ? (
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
        ) : null}
        <Button
          disabled={invitees === null ? true : false}
          color={'#4299E1'}
          labelStyle={styles.buttonText}
          style={{width: '40%', borderRadius: 20}}
          mode="contained"
          onPress={async () => bookNow()}>
          Book Now
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
    padding: 35,
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
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: hp(2.5),
  },
  container: {
    marginTop: 50,
    padding: 5,
  },
});
export default observer(BookNow);
