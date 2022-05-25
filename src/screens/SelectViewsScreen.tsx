/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

export default function SelectViews(props: any) {
  const MENU_BAR = require('../../images/list-view.png');
  const LOC_IMG = require('../../images/floor-plan-view.png');
  const [date, setDate] = React.useState('');
  console.log(props.route.params);

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  useEffect(() => {
    const date = new Date();
    const month = months[date.getMonth()];
    const day = days[date.getDay()];
    const dateNum = date.getDate();
    const year = date.getFullYear();
    const dateString = day + ' ' + dateNum + ' ' + month + ' ' + year;
    setDate(dateString);
  }, []);
  return (
    <SafeAreaView style={styles.page}>
      <Text style={styles.text}>
        How do you want to select your desk or meeting room?
      </Text>
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('ListView', {
            date: date,
            ...props.route.params,
          });
        }}>
        <View style={[styles.box, styles.shadowProp]}>
          <Image style={styles.menuimg} source={MENU_BAR} />
          <Text
            style={{marginLeft: 10, textAlignVertical: 'center', fontSize: 20}}>
            List View
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('FloorPlanView', {
            date: date,
            ...props.route.params,
          });
        }}>
        <View style={[styles.box, styles.shadowProp, {marginTop: 10}]}>
          <Image style={styles.menuimg} source={LOC_IMG} />
          <Text
            style={{marginLeft: 10, textAlignVertical: 'center', fontSize: 20}}>
            Floor Plan View
          </Text>
        </View>
      </TouchableOpacity>
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
  text: {
    marginTop: 50,
    padding: 80,
    textAlign: 'center',
  },
  box: {
    width: 270,
    height: 85,
    display: 'flex',
    flexDirection: 'row',
    borderWidth: 0.1,
  },
  menuimg: {
    marginLeft: 10,
    marginTop: 10,
  },
  shadowProp: {
    // shadowColor: '#171717',
    // shadowOffset: {width: -2, height: 4},
    // shadowOpacity: 1,
    // shadowRadius: 3,
    elevation: 2,
  },
});
