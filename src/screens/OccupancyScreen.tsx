/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {observer} from 'mobx-react-lite';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  ScrollView,
  ToastAndroid,
  Dimensions,
  RefreshControl,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useRootStoreContext} from '../Store';

function Occupancy() {
  const {store, userStore} = useRootStoreContext();

  const [occupancy, setOccupancy] = React.useState<any>(null);
  const HOT_DESK = require('../../images/hotDesk.png');
  const PRI_OFF = require('../../images/meeting-room.png');
  const MEET_ROOM = require('../../images/private-office.png');
  const BACKEND_URL = store.parameters.backendUrl;
  const [refreshing, setRefreshing] = React.useState(false);
  const {height, width} = Dimensions.get('window');
  const aspectRatio = height / width;

  const getOccupancy = async () => {
    const requestOptions = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        accountId: userStore.auth.employee.accountId,
        date: new Date().setMinutes(0, 0, 0),
      }),
    };
    fetch(`${BACKEND_URL}/api/floor_plans/occupancies`, requestOptions)
      .then(response => response.json())
      .then(result => {
        setOccupancy(
          result.occupancies,
        );
      })
      .catch(error => {
        console.log(error);
        ToastAndroid.show('Error fetching Occupancies', ToastAndroid.LONG);
      });
  };
  useEffect(() => {
    getOccupancy();
  }, []);
  const wait = (timeout : any) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(200).then(() =>{ 
    getOccupancy();
    setRefreshing(false)
  });
  }, []);

  return (
    <SafeAreaView style={styles.page}>
      <View
        style={[
          styles.container,
          {
            height:hp(97),
          },
        ]}>
        <Text
          style={{
            alignSelf: 'center',
            fontWeight: '600',
            fontSize: hp(3.5),
            marginTop: hp(2.5),
          }}>
          Occupancy Analytics
        </Text>
        <ScrollView style={{height: hp(55)}}  refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
              />
            }>
          {occupancy?.map((data: any) => {
            return (
              <View style={styles.shadowProp}>
              <View
                style={[
                  styles.box,
                  {
                    height:
                      aspectRatio > 1.6 && aspectRatio < 1.9
                        ? 175
                        : aspectRatio >= 1.9
                        ? 205
                        : 320,
                  },
                ]}>
                <View
                  style={[
                    styles.floor,
                    {
                      padding: aspectRatio > 1.6 ? wp(3) : wp(1.8),
                      flexDirection:'row',
                      justifyContent:'space-around',
                    },
                  ]}>
                  <Text
                  numberOfLines={1}
                  ellipsizeMode='tail'
                    style={{
                      textAlign: 'center',
                      fontSize: hp(1.9),
                      fontWeight: '700',
                      width:wp(38)
                    }}>
                    {data.name} 
                  </Text>
                  <Text style={{
                      textAlign: 'center',
                      fontSize: hp(1.9),
                      fontWeight: '700',
                    }}>{data.occupancy.toFixed(2)}%</Text>
                </View>
                <View style={styles.box2}>
                  <Text
                    style={[
                      styles.headings,
                      {fontSize: hp(2.5), marginTop: hp(1), fontWeight: '500'},
                    ]}>
                    {' '}
                    Availability
                  </Text>
                  <View style={styles.iconConatiner}>
                    <Image
                      style={{
                        marginTop: 3,
                        padding: aspectRatio > 1.6 ? hp(1.2) : hp(1.5),
                      }}
                      source={HOT_DESK}
                    />
                    <Text
                      style={[
                        styles.headings,
                        {fontSize: aspectRatio > 1.6 ? hp(2.1) : hp(1.7)},
                      ]}>
                      {data.desks} hot desks
                    </Text>
                  </View>
                  <View style={styles.iconConatiner}>
                    <Image
                      style={{
                        marginTop: 3,
                        padding: aspectRatio > 1.6 ? hp(1.2) : hp(1.5),
                      }}
                      source={MEET_ROOM}
                    />
                    <Text
                      style={[
                        styles.headings,
                        {fontSize: aspectRatio > 1.6 ? hp(2.1) : hp(1.7)},
                      ]}>
                      {data.rooms} meeting rooms
                    </Text>
                  </View>
                  <View style={styles.iconConatiner}>
                    <Image
                      style={{
                        marginTop: 3,
                        padding: aspectRatio > 1.6 ? hp(1.2) : hp(1.5),
                      }}
                      source={PRI_OFF}
                    />
                    <Text
                      style={[
                        styles.headings,
                        {fontSize: aspectRatio > 1.6 ? hp(2.1) : hp(1.7)},
                      ]}>
                      {data.offices} private offices
                    </Text>
                  </View>
                </View>
              </View>
              </View>
            );
          })}
        </ScrollView>
      </View>
      {/* <View style={styles.graphContainer}>
      <View style={styles.shadow}>
        <ScrollView horizontal={true}>
          <View style={{flexDirection: 'row'}}>
            {occupancy?.map((data: any) => {
              return (
                <View style={{justifyContent: 'center', width: wp(30)}}>
                  <Text style={styles.graphFloorText}>{data.name}</Text>
                  <AnimatedCircularProgress
                    style={{marginTop: hp(1), alignSelf: 'center'}}
                    size={
                      aspectRatio > 1.6 && aspectRatio < 1.9
                        ? 90
                        : aspectRatio >= 1.9
                        ? 120
                        : 210
                    }
                    width={
                      aspectRatio > 1.6 && aspectRatio < 1.9
                        ? 13
                        : aspectRatio >= 1.9
                        ? 18
                        : 35
                    }
                    fill={data.occupancy}
                    lineCap="round"
                    rotation={360}
                    tintColor="#00e0ff"
                    onAnimationComplete={() =>
                      console.log('onAnimationComplete')
                    }
                    backgroundColor="#3d5875">
                    {(fill: any) => <Text style={styles.points}>{`${fill.toFixed(0)}%`}</Text>}
                  </AnimatedCircularProgress>
                  <Text style={styles.graphFloorText}>
                    {data.occupancy}%{'\n'}Occupancy
                  </Text>
                </View>
              );
            })}
          </View>
        </ScrollView>
      </View>
      </View> */}
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
  container: {
    width: '95%',
    alignSelf: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  box: {
    width: wp(68),
    marginTop: hp(3.5),
    borderRadius: 40,
    overflow: 'hidden',
    alignSelf: 'center',
    backgroundColor: '#51d1fa',
    
  },
  shadowProp: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5.5,
    },
    shadowOpacity: 0.50,
    shadowRadius: 3.90,
    elevation: 5,
  },
  headings: {
    textAlign: 'center',
    padding: wp(0.5),
    lineHeight: hp(2.6),
    marginLeft: 8,
  },
  floor: {
    borderBottomWidth: 1,
  },
  box2: {
    justifyContent: 'flex-start',
    width: '60%',
    alignSelf: 'center',
  },
  iconConatiner: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    textAlignVertical: 'center',
    marginTop: hp(0.7)
  },
  points: {
    textAlign: 'center',
    color: '#7591af',
    fontSize: hp(3),
    fontWeight: '400',
  },
  graphContainer: {
    width: wp(92),
    position: 'absolute',
    bottom: 0,
    height: hp(28),
    marginBottom: hp(4),
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor:'white',
    height: hp(29),

  },
  graphFloorText: {
    textAlign: 'center',
    marginTop: hp(2),
    fontSize: hp(2),
    fontWeight: '700',
  },
});
export default observer(Occupancy);
