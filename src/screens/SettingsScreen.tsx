/* eslint-disable react-native/no-inline-styles */
import {observer} from 'mobx-react';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import VersionInfo from 'react-native-version-info';
import {useRootStoreContext} from '../Store';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

function Settings(props: any) {
  const {userStore, store} = useRootStoreContext();
  const BACKEND_URL = store.parameters.backendUrl;
  const {height, width} = Dimensions.get('window');
  const aspectRatio = height / width;
  return (
    <SafeAreaView style={styles.page}>
      <Text style={styles.welcome}>Hi, {userStore.auth.employee.name}</Text>
      <Text
        style={{
          ...styles.welcome,
          fontSize: hp(3),
          paddingHorizontal: 10,
          textAlign: 'center',
        }}>
        Welcome to{' '}
        <Text style={{fontWeight: 'bold'}}>
          {userStore.auth.sites[0]?.name}
        </Text>{' '}
        Room Booking
      </Text>
      <Image
        resizeMode="contain"
        source={{
          uri: `${BACKEND_URL}/api/sites/getLogo/${userStore.auth.sites[0]?.id}?small=true`,
        }}
        style={styles.companyLogo}
      />
      <View
        style={[
          styles.bottomContainer,
          {
            height:
              aspectRatio < 1.6
                ? hp(40)
                : aspectRatio < 1.9
                ? hp(38)
                : Platform.OS == 'android'
                ? hp(38)
                : hp(34),
          },
        ]}>
        <View style={styles.settingsContainer}>
          <View
            style={{
              justifyContent: 'space-around',
              width: wp(65),
              flexDirection: 'row',
            }}>
            <Text
              style={{
                textAlign: 'right',
                fontSize: hp(2.5),
                fontWeight: '700',
              }}>
              Settings
            </Text>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('Booking');
              }}>
              <Text style={{color: 'red', fontSize: hp(2), fontWeight: '500'}}>
                Done
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.versionContainer}>
          <Text
            style={{
              textAlign: 'left',
              width: aspectRatio < 1.6 ? wp(60) : wp(55),
              fontSize: hp(2),
              fontWeight: '500',
            }}>
            Version
          </Text>
          <Text style={{fontSize: hp(1.8)}}>{VersionInfo.appVersion}</Text>
        </View>
        <View style={styles.userContainer}>
          <View style={{width: wp(27)}}>
            <Text
              style={{
                textAlign: 'left',
                fontSize: hp(2),
                padding: hp(0.2),
                fontWeight: '600',
              }}>
              User Profile
            </Text>
            <Text
              style={{
                textAlign: 'left',
                fontSize: hp(2),
                padding: hp(0.2),
                fontWeight: '600',
              }}>
              User Type
            </Text>
          </View>
          <View style={{width: wp(30)}}>
            <Text
              style={{fontSize: hp(1.8), padding: hp(0.2), textAlign: 'right'}}>
              {userStore.auth.employee.name}
            </Text>
            <Text
              style={{fontSize: hp(1.8), padding: hp(0.2), textAlign: 'right'}}>
              {userStore.auth.employee.category === 'A'
                ? 'Member'
                : userStore.auth.employee.category === 'B'
                ? 'Manager'
                : userStore.auth.employee.category === 'A'
                ? 'Executive'
                : ''}
            </Text>
          </View>
        </View>
        <View style={styles.userContainer}>
          <View style={{width: aspectRatio < 1.6 ? wp(76) : wp(77)}}>
            <TouchableOpacity
              style={{flexDirection: 'row', justifyContent: 'space-between'}}
              onPress={() => {
                props.navigation.navigate('PrivacyPolicy');
              }}>
              <Text
                style={{
                  textAlign: 'left',
                  fontSize: hp(2),
                  padding: hp(0.2),
                  fontWeight: '600',
                }}>
                Privacy policy
              </Text>
              <Icon name="angle-right" size={25} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text
                style={{
                  textAlign: 'left',
                  fontSize: hp(2),
                  padding: hp(0.2),
                  fontWeight: '600',
                }}>
                Help Center
              </Text>
              <Icon name="angle-right" size={25} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.logout}>
          <TouchableOpacity
            onPress={() => {
              userStore.update('site', {});
              userStore.update('employee', {});
              userStore.update('logout', true);
              props.navigation.navigate('Init');
            }}>
            <Text
              style={{
                textAlign: 'center',
                width: aspectRatio < 1.6 ? wp(24) : wp(29),
                color: 'red',
                fontSize: hp(2),
                fontWeight: '500',
              }}>
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      </View>
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
    marginTop: hp(5),
    fontSize: hp(3.5),
  },
  companyLogo: {
    width: wp(35),
    height: hp(20),
    marginTop: hp(2),
  },
  text: {
    textAlign: 'center',
    fontSize: wp(2.5),
    fontWeight: '700',
    color: '#1C8ADB',
    marginTop: 10,
  },
  bottomContainer: {
    position: 'absolute',
    width: wp(100),
    backgroundColor: '#EEEEEE',
    borderTopLeftRadius: wp(10),
    borderTopRightRadius: wp(10),
    bottom: 0,
  },
  settingsContainer: {
    padding: wp(2.5),
    flexDirection: 'row',
    borderBottomWidth: 0.8,
    borderBottomColor: '#cbcbcb',
    justifyContent: 'flex-end',
  },
  versionContainer: {
    width: wp(100),
    padding: wp(3.5),
    flexDirection: 'row',
    borderBottomWidth: 0.8,
    borderBottomColor: '#cbcbcb',
    justifyContent: 'space-around',
  },
  userContainer: {
    width: wp(100),
    padding: wp(2.5),
    flexDirection: 'row',
    borderBottomWidth: 0.8,
    borderBottomColor: '#cbcbcb',
    justifyContent: 'space-around',
  },
  logout: {
    padding: hp(2.5),
    flexDirection: 'row',
  },
});
export default observer(Settings);
