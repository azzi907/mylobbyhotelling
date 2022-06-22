/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import USER from '../../images/user.png';
import BOOK_DESK from '../../images/Union.png';
import MY_MEET from '../../images/icon.png';

import {useRootStoreContext} from '../Store';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {observer} from 'mobx-react';
function CustomTabBar(props: any) {
  const {userStore} = useRootStoreContext();

  const [selectedDesk, setSelectedDesk] = React.useState(false);
  const [selectedColl, setSelectedColl] = React.useState(false);
  const [selectedMeet, setSelectedMeet] = React.useState(false);

  const navigateToBookingScreen = () => {
    props.navigation.navigate('Booking');
  };

  const navigateToFindColleague = () => {
    props.navigation.navigate('FindColleagues');
  };

  const navigateToMyMeetings = () => {
    props.navigation.navigate('MyMeetings');
  };
  return (
    <View
      style={{
        ...styles.TabBarMainContainer,
        display: userStore.auth.logout ? 'none' : 'flex',
      }}>
      <TouchableOpacity
        onPress={() => {
          navigateToBookingScreen();
          setSelectedDesk(true);
          setSelectedColl(false);
          setSelectedMeet(false);
        }}>
        <View style={styles.container}>
          <Image
            style={[
              styles.img,
              {tintColor: selectedDesk ? '#51D1FA' : '#ffffff'},
            ]}
            source={BOOK_DESK}
          />
          <Text
            style={[
              styles.textStyle,
              {color: selectedDesk ? '#51D1FA' : '#ffffff'},
            ]}>
            Book A Desk
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigateToFindColleague();
          setSelectedColl(true);
          setSelectedMeet(false);
          setSelectedDesk(false);
        }}>
        <View style={styles.container}>
          <Image
            style={
              [styles.img, {tintColor: selectedColl ? '#51D1FA' : '#ffffff'}]}
            source={USER}
          />
          <Text
            style={[
              styles.textStyle,
              {color: selectedColl ? '#51D1FA' : '#ffffff'},
            ]}>
            Find A Colleague
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigateToMyMeetings();
          setSelectedMeet(true);
          setSelectedDesk(false);
          setSelectedColl(false);
        }}>
        <View style={styles.container}>
          <Image
            style={[
              styles.img,
              {tintColor: selectedMeet ? '#51D1FA' : '#ffffff'},
            ]}
            source={MY_MEET}
          />
          <Text
            style={[
              styles.textStyle,
              {color: selectedMeet ? '#51D1FA' : '#ffffff'},
            ]}>
            My Meetings
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  TabBarMainContainer: {
    justifyContent: 'space-evenly',
    height: hp(7.5),
    flexDirection: 'row',
    position: 'relative',
    backgroundColor: 'black',
  },
  textStyle: {
    color: '#fff',
    textAlign: 'center',
    fontSize: hp(1.5),
    marginTop: 3,
  },
  img: {
    padding: hp(0.95),
    alignSelf:'center',
  },
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    padding: hp(1),
    marginTop: hp(0.5),
  },
  imgQR: {
    height: 15,
    width: 15,
    marginLeft: wp(4),
  },
});
export default observer(CustomTabBar);
