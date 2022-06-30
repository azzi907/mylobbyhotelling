/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';

export default function SelectViews(props: any) {
  const MENU_BAR = require('../../images/list-view.png');
  const LOC_IMG = require('../../images/floor-plan-view.png');
  const {height, width} = Dimensions.get('window');
  const aspectRatio = height / width;
  
  return (
    <SafeAreaView style={styles.page}>
      <View style={styles.container}>
        <Text style={styles.text}>
          How do you want to select your desk or meeting room?
        </Text>
        <View style={styles.boxShadow}>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('ListView', {
                ...props.route.params,
              });
            }}>
            <View
              style={[
                styles.box,
                {
                  height:aspectRatio > 1.6 ? heightPercentageToDP(11) : heightPercentageToDP(15) ,
                }
              ]}>
              <Image
                style={styles.menuimg}
                resizeMode="contain"
                source={MENU_BAR}
              />
              <Text
                style={{
                  marginLeft: widthPercentageToDP(3),
                  textAlignVertical: 'center',
                  fontSize: heightPercentageToDP(2.7),
                }}>
                List View
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('FloorPlanView', {
              ...props.route.params,
            });
          }}>
          <View style={[
                styles.box,
                {
                  height:aspectRatio > 1.6 ? heightPercentageToDP(11) : heightPercentageToDP(15) ,
                }
              ]}>
            <Image
              style={styles.menuimg}
              resizeMode="contain"
              source={LOC_IMG}
            />
            <Text
              style={{
                marginLeft: widthPercentageToDP(3),
                textAlignVertical: 'center',
                fontSize: heightPercentageToDP(2.7),
              }}>
              Floor Plan View
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <Text style={{bottom: '3%', position: 'absolute'}}>
        Powered by MyLobby.co
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    paddingBottom: 80,
    paddingHorizontal: 80,
    fontSize: widthPercentageToDP(5),
    fontWeight: '500',
  },
  box: {
    width: widthPercentageToDP(75),
    height: heightPercentageToDP(11),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.32,
    shadowRadius: 3.46,

    elevation: 1,
    backgroundColor: 'white',
  },
  menuimg: {
    marginLeft: widthPercentageToDP(2),
    width: widthPercentageToDP(13.5),
    height: heightPercentageToDP(13.5),
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,
  },
});
