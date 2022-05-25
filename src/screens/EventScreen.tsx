/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, Platform} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Picker} from '@react-native-picker/picker';
import Store from '../Store';
import * as AddCalendarEvent from 'react-native-add-calendar-event';
import * as RNLocalize from 'react-native-localize';
import moment from 'moment';

const EventScreen = (props: any) => {
  const BACKEND_URL = Store.store.parameters.backendUrl;
  const bookingType = props.route.params.bookingType;
  const [text, setText] = useState('');
  const [sites, setSites] = useState<any>();
  const [siteId, setSiteId] = useState(null);
  const [siteName, setSiteName] = useState('');
  const [token, setToken] = useState<any>();
  const [tokenExpiration, setTokenExpiration] = useState<any>();
  const [employee, setEmployee] = useState<any>();
  const [startDate, setStartDate] = useState<any>();
  const [startTime, setStartTime] = useState<any>();
  const [endDate, setEndDate] = useState<any>();
  const [endTime, setEndTime] = useState<any>();
  const [isStartDatePickerVisible, setStartDatePickerVisibility] =
    useState(false);
  const [isStartTimePickerVisible, setStartTimePickerVisibility] =
    useState(false);
  const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);
  const [isEndTimePickerVisible, setEndTimePickerVisibility] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  const showStartDatePicker = () => {
    setStartDatePickerVisibility(true);
  };

  const showStartTimePicker = () => {
    setStartTimePickerVisibility(true);
  };

  const hideStartDatePicker = () => {
    setStartDatePickerVisibility(false);
  };

  const hideStartTimePicker = () => {
    setStartTimePickerVisibility(false);
  };

  const handleConfirmStartDate = (date: Date) => {
    setStartDate(date.toISOString().substring(0, 10));
    hideStartDatePicker();
  };
  const handleConfirmStartTime = (date: Date) => {
    setStartTime(
      date.getHours() +
        ':' +
        (date.getMinutes() < 10 ? '0' : '') +
        date.getMinutes(),
    );
    hideStartTimePicker();
  };

  const showEndDatePicker = () => {
    setEndDatePickerVisibility(true);
  };

  const showEndTimePicker = () => {
    setEndTimePickerVisibility(true);
  };

  const hideEndDatePicker = () => {
    setEndDatePickerVisibility(false);
  };

  const hideEndTimePicker = () => {
    setEndTimePickerVisibility(false);
  };

  const handleConfirmEndDate = (date: Date) => {
    setEndDate(date.toISOString().substring(0, 10));
    hideEndDatePicker();
  };
  const handleConfirmEndTime = (date: Date) => {
    setEndTime(
      date.getHours() +
        ':' +
        (date.getMinutes() < 10 ? '0' : '') +
        date.getMinutes(),
    );
    hideEndTimePicker();
  };

  useEffect(() => {
    if (
      siteId === null ||
      siteName === '' ||
      startDate === null ||
      endDate === null
    ) {
      return;
    }
    setIsDisabled(false);
  }, [siteId, siteName, startDate, endDate]);

  const getStartDate = () => {
    const date = new Date();
    if (date.getMinutes() > 1) {
      date.setHours(date.getHours() + 1);
      date.setMinutes(0, 0, 0);
      return date;
    }
    return date;
  };

  useEffect(() => {
    if (startDate !== undefined && startDate !== null) {
      const date = new Date(startDate);
      setStartDate(date.toISOString().substring(0, 10));
      setStartTime(
        date.getHours() +
          ':' +
          (date.getMinutes() < 10 ? '0' : '') +
          date.getMinutes(),
      );
      date.setHours(date.getHours() + 1);
      setEndTime(
        date.getHours() +
          ':' +
          (date.getMinutes() < 10 ? '0' : '') +
          date.getMinutes(),
      );

      setEndDate(date.toISOString().substring(0, 10));
    }
  }, [startDate]);

  useEffect(() => {
    setStartDate(getStartDate());
  }, []);

  const creatEvent = async () => {
    const bookTimeIn = startDate + 'T' + startTime + ':00';
    const bookTimeOut = endDate + 'T' + endTime + ':00';
    var myHeaders = new Headers();
    const emp = JSON.parse(employee);
    myHeaders.append('Content-Type', 'application/json');
    var raw = JSON.stringify({
      name: emp.name,
      siteName: siteName,
      company: emp.company,
      phone: emp.phonesms,
      email: emp.email,
      jobTitle: emp.jobTitle,
      isRoom: false,
      isDesk: true,
      isOffice: false,
      bookingType: bookingType,
      siteId: siteId,
      accountId: emp.accountId,
      employeeId: emp.id,
      roomId: 1651046591872,
      roomName: 'Desk A1',
      bookedTimeIn: new Date(bookTimeIn).getTime(),
      bookedTimeOut: new Date(bookTimeOut).getTime(),
      timeZone: RNLocalize.getTimeZone(),
      title: text,
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch(
      `${BACKEND_URL}/api/rooms_reservations/add?token=${token}`,
      requestOptions,
    )
      .then(response => response.json())
      .then(async result => {
        const reservation = JSON.stringify(result.reservation);
        try {
          const eventConfig: AddCalendarEvent.CreateOptions = {
            title: text,
            startDate: moment(bookTimeIn).toISOString(),
            endDate: moment(bookTimeOut).toISOString(),
            location: siteName,
          };
          const result = await AddCalendarEvent.presentEventCreatingDialog(
            eventConfig,
          );
          if (result.action === 'SAVED') {
            const {calendarItemIdentifier, eventIdentifier} = result;

            console.log(calendarItemIdentifier, eventIdentifier);
            props.navigation.navigate('Reservation', {
              reservation: reservation,
            });
          } else {
            console.log('Canceled');
          }
        } catch (error) {
          console.log('WHAT');
          console.log(error);
        }

        // Linking.openURL('content://com.android.calendar/time/');
        // }
      });
  };

  const getDataFromAsyncStorage = async () => {
    const sites = await AsyncStorage.getItem('sites');
    setSites(JSON.parse(sites || '{}'));
    const token = (await AsyncStorage.getItem('token')) || '';
    setToken(token);
    const tokenExpire = (await AsyncStorage.getItem('tokenExpiration')) || '';
    setTokenExpiration(tokenExpire);
    const emp = (await AsyncStorage.getItem('employee')) || '';

    setEmployee(emp);
  };

  useEffect(() => {
    getDataFromAsyncStorage();
  }, []);

  return (
    <View style={styles.page}>
      <View style={styles.inputField}>
        <TextInput
          mode="flat"
          label="Event Name"
          value={text}
          onChangeText={text => setText(text)}
        />
      </View>
      <View
        style={{
          ...styles.inputField,
          marginTop: Platform.OS === 'ios' ? 0 : 60,
          marginBottom: Platform.OS === 'ios' ? 120 : 0,
        }}>
        <Picker
          selectedValue={siteId}
          onValueChange={(itemValue, itemIndex) => {
            setSiteId(itemValue);
            const site = sites.filter((s: any) => s.id === itemValue);
            setSiteName(site[0].name);
          }}>
          <Picker.Item value={''} label={'Choose Site'} />
          {sites?.map((s: any) => {
            return (
              <Picker.Item
                key={s.id + ' ' + s.name}
                value={s.id}
                label={s.name}
              />
            );
          })}
        </Picker>
      </View>
      <View style={styles.startDateTime}>
        <Text style={styles.label}>Start Date:</Text>
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <Button onPress={showStartDatePicker}>{startDate?.toString()}</Button>
          <DateTimePickerModal
            isVisible={isStartDatePickerVisible}
            mode="date"
            onConfirm={handleConfirmStartDate}
            onCancel={hideStartDatePicker}
          />
          <Button onPress={showStartTimePicker}>{startTime?.toString()}</Button>
          <DateTimePickerModal
            isVisible={isStartTimePickerVisible}
            mode="time"
            onConfirm={handleConfirmStartTime}
            onCancel={hideStartTimePicker}
          />
        </View>
      </View>
      <View style={styles.startDateTime}>
        <Text style={styles.label}>End Date:</Text>
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <Button onPress={showEndDatePicker}>{endDate?.toString()}</Button>
          <DateTimePickerModal
            isVisible={isEndDatePickerVisible}
            mode="date"
            onConfirm={handleConfirmEndDate}
            onCancel={hideEndDatePicker}
          />
          <Button onPress={showEndTimePicker}>{endTime?.toString()}</Button>
          <DateTimePickerModal
            isVisible={isEndTimePickerVisible}
            mode="time"
            onConfirm={handleConfirmEndTime}
            onCancel={hideEndTimePicker}
          />
        </View>
      </View>
      <View style={styles.submit}>
        <Button
          disabled={isDisabled}
          mode="contained"
          onPress={creatEvent}
          style={{width: '100%', borderRadius: 20}}>
          Create Event
        </Button>
      </View>
    </View>
  );
};

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
  inputField: {
    width: '90%',
    height: 40,
    marginTop: 80,
  },
  startDateTime: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 30,
    justifyContent: 'flex-start',
    alignSelf: 'flex-start',
    marginTop: 20,
  },
  label: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 5,
  },
  submit: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '50%',
    marginTop: 30,
  },
});

export default EventScreen;
