/* eslint-disable react-native/no-inline-styles */
import React from 'react';
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
  console.log("Props ====> " , props.route.params);
  return (
    <SafeAreaView style={styles.page}>
      <View style={styles.container}>
        <Text style={styles.text}>
          How do you want to select your desk or meeting room?
        </Text>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('ListView', {
              ...props.route.params,
            });
          }}>
          <View style={styles.box}>
            <Image style={styles.menuimg} source={MENU_BAR} />
            <Text
              style={{
                marginLeft: 10,
                textAlignVertical: 'center',
                fontSize: 20,
              }}>
              List View
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('FloorPlanView', {
              ...props.route.params,
            });
          }}>
          <View style={styles.box}>
            <Image style={styles.menuimg} source={LOC_IMG} />
            <Text
              style={{
                marginLeft: 10,
                textAlignVertical: 'center',
                fontSize: 20,
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
  },
  box: {
    width: 270,
    height: 85,
    display: 'flex',
    flexDirection: 'row',
    borderWidth: 0.5,
    alignItems: 'center',
    marginTop: 10,
  },
  menuimg: {
    marginLeft: 10,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
