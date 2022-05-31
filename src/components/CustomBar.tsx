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

  const navigateToBookingScreen = () => {
    props.navigation.navigate('Booking');
  };

  const navigateToFindColleague = () => {
    props.navigation.navigate('MyMeetings');
  };

  const navigateToMyMeetings = () => {
    props.navigation.navigate('MyMeetings');
  };
  console.log('logout ==>>>>', userStore.auth.logout);

  return (
    <View
      style={{
        ...styles.TabBarMainContainer,
        display: userStore.auth.logout ? 'none' : 'flex',
      }}>
      <TouchableOpacity onPress={navigateToBookingScreen}>
        <View style={styles.container}>
          <Image style={styles.img} source={BOOK_DESK} />
          <Text style={styles.textStyle}>Book A Desk</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={navigateToFindColleague}>
        <View style={styles.container}>
          <Image style={[styles.img, {marginLeft: wp(10)}]} source={USER} />
          <Text style={styles.textStyle}>Find A Colleague</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={navigateToMyMeetings}>
        <View style={[styles.container, {marginTop: hp(1.5)}]}>
          <Image style={styles.img} source={MY_MEET} />
          <Text style={styles.textStyle}>My Meetings</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  TabBarMainContainer: {
    justifyContent: 'space-around',
    height: hp(7.5),
    flexDirection: 'row',
    position: 'relative',
    backgroundColor: 'black',
  },
  textStyle: {
    color: '#fff',
    textAlign: 'center',
    fontSize: wp(3),
    marginTop: 3,
  },
  img: {
    padding: hp(1),
    marginLeft: hp(3),
  },
  container: {
    padding: hp(1),
    marginTop: hp(1),
  },
});
export default observer(CustomTabBar);
