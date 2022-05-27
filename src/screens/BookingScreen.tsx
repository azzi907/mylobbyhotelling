/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ToastAndroid,
  SafeAreaView,
} from 'react-native';
import React, {useState} from 'react';
import Store from '../Store';
import {Button, Modal, Portal, TextInput} from 'react-native-paper';
import * as AddCalendarEvent from 'react-native-add-calendar-event';
import RNCalendarEvents from 'react-native-calendar-events';

export default function BookingScreen(props: any) {
  const BACKEND_URL = Store.store.parameters.backendUrl;
  const [visible, setVisible] = useState(false);
  const [ical, setiIcal] = useState('');
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const saveIcal = async () => {
    const requestOptions = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: Store.userStore.auth.employee.id,
        accountId: Store.userStore.auth.employee.accountId,
        ical: ical,
      }),
    };
    console.log('====================================');
    console.log(requestOptions);
    console.log('====================================');
    fetch(`${BACKEND_URL}/api/employees/saveical`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.success) {
          setVisible(false);
        }
      })
      .catch(error => {
        ToastAndroid.show('Error saving ical', ToastAndroid.LONG);
      });
  };

  function logout() {
    Store.userStore.update('site', {});
    Store.userStore.update('employee', {});
    props.navigation.navigate('Init');
  }
  async function calenderEvent(
    bookingType: string,
    isRoom: boolean,
    isOffice: boolean,
    isDesk: boolean,
  ) {
    try {
      const eventConfig: AddCalendarEvent.CreateOptions = {
        title: '',
        location: '',
      };
      const result = await AddCalendarEvent.presentEventCreatingDialog(
        eventConfig,
      );
      console.log(result);

      if (result.action === 'SAVED') {
        const {calendarItemIdentifier, eventIdentifier} = result;
        RNCalendarEvents.checkPermissions();
        RNCalendarEvents.findCalendars();
        const reservation = await RNCalendarEvents.findEventById(
          calendarItemIdentifier,
        );
        const invitees = reservation?.attendees?.slice(1);
        props.navigation.navigate('SelectViews', {
          startDate: reservation?.startDate,
          endDate: reservation?.endDate,
          title: reservation?.title,
          location: reservation?.location,
          notes: reservation?.description,
          invitees: invitees,
          bookingType: bookingType,
          isRoom: isRoom,
          isOffice: isOffice,
          isDesk: isDesk,
        });
      } else {
        props.navigation.navigate('Init');
      }
    } catch (error) {
      console.log('WHAT');
      console.log(error);
    }
  }
  return (
    <SafeAreaView style={styles.page}>
      <Text style={styles.welcome}>
        Hi, {Store.userStore.auth.employee.name}
      </Text>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={styles.modalContainer}>
          <Text>Add your ical link</Text>
          <TextInput
            style={{width: '100%', height: 50, marginTop: 25}}
            label="Ical"
            value={ical}
            onChangeText={text => setiIcal(text)}
          />
          <View style={styles.row}>
            <Button
              color={'#4299E1'}
              labelStyle={{...styles.buttonText, width: 80}}
              style={{borderRadius: 20, marginTop: 15}}
              mode="contained"
              onPress={hideModal}>
              Cancel
            </Button>
            <Button
              color={'#4299E1'}
              labelStyle={{...styles.buttonText, width: 80}}
              style={{borderRadius: 20, marginTop: 15}}
              mode="contained"
              onPress={() => saveIcal()}>
              Add
            </Button>
          </View>
        </Modal>
      </Portal>
      <Text
        style={{
          ...styles.welcome,
          fontSize: 20,
          paddingHorizontal: 10,
          textAlign: 'center',
        }}>
        Welcome to{' '}
        <Text style={{fontWeight: 'bold'}}>
          {Store.userStore.auth.sites[0].name}
        </Text>{' '}
        Room Booking
      </Text>
      <Image
        source={{
          uri: `${BACKEND_URL}/api/sites/getLogo/${Store.userStore.auth.sites[0].id}?small=true`,
        }}
        style={styles.companyLogo}
      />
      <Button
        color={'#4299E1'}
        labelStyle={styles.buttonText}
        style={{borderRadius: 20, marginTop: 10}}
        mode="contained"
        onPress={() =>
          calenderEvent('Booked Meeting Desk', false, false, true)
        }>
        Book Hot Desk
      </Button>
      <Button
        color={'#4299E1'}
        labelStyle={styles.buttonText}
        style={{borderRadius: 20, marginTop: 15}}
        mode="contained"
        onPress={() =>
          calenderEvent('Booked Private Office', false, true, false)
        }>
        Book Private Office
      </Button>
      <Button
        color={'#4299E1'}
        labelStyle={styles.buttonText}
        style={{borderRadius: 20, marginTop: 15}}
        mode="contained"
        onPress={() =>
          calenderEvent('Booked Meeting Room', true, false, false)
        }>
        Book Meeting Room
      </Button>
      <Button
        color={'#4299E1'}
        labelStyle={{...styles.buttonText, color: '#4299E1'}}
        style={{
          borderRadius: 20,
          marginTop: 35,
          borderWidth: 1,
          borderColor: '#4299E1',
        }}
        mode="outlined"
        onPress={logout}>
        Log Out
      </Button>
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
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  welcome: {
    marginTop: 50,
    fontSize: 25,
  },
  companyLogo: {
    width: 150,
    height: 150,
    marginTop: 30,
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    width: '70%',
  },
  icalButton: {
    width: 100,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    borderRadius: 20,
    top: 25,
    right: 10,
    backgroundColor: '#4299E1',
  },
  row: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  modalContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '80%',
    height: 200,
    alignSelf: 'center',
    backgroundColor: 'white',
    padding: 20,
  },
});
