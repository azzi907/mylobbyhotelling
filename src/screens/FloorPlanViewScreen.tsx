/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ToastAndroid,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';
import ImageMapper from '../components/ImageMapper';
import DropDownPicker from 'react-native-dropdown-picker';

import {useRootStoreContext} from '../Store';
import {observer} from 'mobx-react-lite';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

function FloorPlanView(this: any, props: any) {
  const {store, userStore} = useRootStoreContext();

  const BACK_ICON = require('../../images/back-icon.png');
  const RECT_RED = require('../../images/rectangle-red.png');
  const RECT_GREEN = require('../../images/rectangle-green.png');
  const CIRC_RED = require('../../images/circle-red.png');
  const CIRC_GREEN = require('../../images/circle-green.png');
  const SOCIAL_DIST = require('../../images/socialDistancingIcon.png');

  const BACKEND_URL = store.parameters.backendUrl;
  const [area, setArea] = React.useState<any>({});
  const [open, setOpen] = useState(false);
  const [floorPlanList, setFloorPlanList] = useState<any>([]);
  const [selectedFloorPlan, setSelectedFloorPlan] = useState<any>();
  const [floorPlanAll, setFloorPlanAll] = React.useState<any>([]);
  const [Plan, setFloorPlan] = React.useState<any>(null);
  const [rooms, setRooms] = useState<any>(null);

  const getRooms = async () => {
    const date1 = new Date(props.route.params.startDate);
    const date2 = new Date(props.route.params.endDate);
    const requestOptions = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        accountId: userStore.auth.employee.accountId,
        dateFrom: date1.getTime(),
        dateTo: date2.getTime(),
        isDesk: props.route.params.isDesk,
        isRoom: props.route.params.isRoom,
        isOffice: props.route.params.isOffice,
      }),
    };
    fetch(`${BACKEND_URL}/api/rooms/availableList`, requestOptions)
      .then(response => response.json())
      .then(result => {
        setRooms(result.rooms);
      })
      .catch(error => {
        console.log(error);
        ToastAndroid.show('Error saving ical', ToastAndroid.LONG);
      });
  };

  React.useEffect(() => {
    console.log('Selected Floor Plan ===>', selectedFloorPlan);

    if (selectedFloorPlan) {
      const fp: any = floorPlanAll.filter(
        (fpc: any) => fpc.name === selectedFloorPlan,
      );
      fp[0].areaRN?.forEach((ar: any) => {
        const isAvailable = rooms.find(
          (room: any) =>
            room.location === fp[0].name &&
            room.name === ar.name &&
            room.isBlocked === false,
        );
        const blocked = rooms.find(
          (room: any) =>
            room.location === fp[0].name &&
            room.name === ar.name &&
            room.isBlocked === true,
        );
        if (isAvailable) {
          ar.fill = 'green';
          ar.prefill = 'green';
        } else if (blocked) {
          ar.fill = 'white';
          ar.prefill = 'white';
        } else {
          ar.fill = 'red';
          ar.prefill = 'red';
        }
      });
      setArea(fp[0].areaRN);
      setFloorPlan(fp[0]);
    }
  }, [selectedFloorPlan]);

  React.useEffect(() => {
    getRooms();
  }, []);

  const getFloorPlan = async () => {
    fetch(
      `${BACKEND_URL}/api/floor_plans/list?accountId=${userStore.auth.employee.accountId}`,
    )
      .then(response => response.json())
      .then(result => {
        const floorPlan = result.floorPlans;
        setFloorPlanAll(floorPlan);
        floorPlan[0].areaRN.forEach((ar: any) => {
          const isAvailable = rooms.find(
            (room: any) =>
              room.location === floorPlan[0].name &&
              room.name === ar.name &&
              room.isBlocked === false,
          );
          const blocked = rooms.find(
            (room: any) =>
              room.location === floorPlan[0].name &&
              room.name === ar.name &&
              room.isBlocked === true,
          );
          if (isAvailable) {
            ar.fill = 'green';
            ar.prefill = 'green';
          } else if (blocked) {
            ar.fill = 'white';
            ar.prefill = 'white';
          } else {
            ar.fill = 'red';
            ar.prefill = 'red';
          }
        });
        setArea(floorPlan[0].areaRN);
        setFloorPlan(floorPlan[0]);
        const l: any = [];
        floorPlan.map((fp: any) => {
          l.push({label: fp.name, value: fp.name});
        });
        setFloorPlanList(l);
      })
      .catch((error: any) => {
        console.log('floor plan exception =>', error);
        ToastAndroid.show('Error Getting Floor Plan', ToastAndroid.LONG);
      });
  };

  function mainImgWasPressed(item: any) {
    if (item.fill === 'green') {
      const resource = rooms.find((r: any) => r.name === item.name);
      props.navigation.navigate('BookNow', {
        ...props.route.params,
        roomId: resource.id,
        roomName: resource.name,
        selectedFloorPlan: selectedFloorPlan,
      });
    } else if (item.fill === 'white') {
      if (Platform.OS === 'android') {
        ToastAndroid.show('Not Available Due to Social Distancing', ToastAndroid.LONG);
      } else {
        Alert.alert('Not Available Due to Social Distancing');
      }
    } else {
      if (Platform.OS === 'android') {
        ToastAndroid.show('Already Booked', ToastAndroid.LONG);
      } else {
        Alert.alert('Already Booked');
      }
    }
  }

  React.useEffect(() => {
    if (rooms) {
      getFloorPlan();
    }
  }, [rooms]);

  return (
    <SafeAreaView style={styles.page}>
      <View style={styles.container}>
        <View style={{display: 'flex', flexDirection: 'row', marginTop: 15}}>
          <TouchableOpacity
            style={{display: 'flex', flexDirection: 'row'}}
            onPress={() => {
              props.navigation.navigate('SelectViews', {...props.route.params});
            }}>
            <Image style={{marginTop: 3}} source={BACK_ICON} />
            <Text style={{color: '#51D1FA', marginLeft: 4}}>Back</Text>
          </TouchableOpacity>
          <Text style={{marginLeft: wp(25), fontWeight: '600'}}>
            Search results
          </Text>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            marginTop: 15,
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity>
            <Text style={styles.floorPlanView}>Floor Plan View</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('ListView', {
                date: props.route.params.date,
                ...props.route.params,
              });
            }}>
            <Text style={{fontSize: 15, fontWeight: '500'}}>List View</Text>
          </TouchableOpacity>
        </View>
        <View style={{marginTop: 10, zIndex: 1}}>
          <DropDownPicker
            open={open}
            value={selectedFloorPlan}
            items={floorPlanList}
            setOpen={setOpen}
            setValue={() => {}}
            onSelectItem={t => setSelectedFloorPlan(t.value)}
            placeholder="Select Floor Plan"
          />
        </View>
        <View style={styles.floorPlanContainer}>
          {Plan?.file ? (
            <ScrollView horizontal={true}>
              <ScrollView
                nestedScrollEnabled
                showsVerticalScrollIndicator={false}>
                <ImageMapper
                  imgHeight={Plan.imageDim[1]}
                  imgWidth={Plan.imageDim[0]}
                  imgSource={`${BACKEND_URL}/resources/floorplans/${userStore.auth.employee.sites[0]}/${Plan.file}`}
                  imgMap={area}
                  onPress={(item: any) => mainImgWasPressed(item)}
                  containerStyle={{top: 10}}
                  selectedAreaId={'0'}
                />
              </ScrollView>
            </ScrollView>
          ) : null}
        </View>
      </View>
      <View style={styles.box}>
        <Text style={{alignSelf: 'center', fontWeight: '600' , marginTop: hp(0.5)}}>Legend</Text>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}>
          <View style={styles.legendDescription}>
            <Image style={{marginTop: 3}} source={CIRC_GREEN} />
            <Text style={styles.text}>Desk is avaiable</Text>
          </View>
          <View style={styles.legendDescription}>
            <Image style={{marginTop: 3}} source={CIRC_RED} />
            <Text style={styles.text}>Desk is taken</Text>
          </View>
          <View style={styles.legendDescription}>
            <Image style={{marginTop: 3}} source={SOCIAL_DIST} />
            <Text style={styles.text}>Desk is blocked</Text>
          </View>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop: 5,
          }}>
          <View style={styles.legendDescription}>
            <Image style={{marginTop: 3}} source={RECT_GREEN} />
            <Text style={styles.text}>Desk is avaiable</Text>
          </View>
          <View style={styles.legendDescription}>
            <Image style={{marginTop: 3}} source={RECT_RED} />
            <Text style={styles.text}>Desk is taken</Text>
          </View>
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
    alignItems: 'center',
  },
  container: {
    width: '95%',
    alignSelf: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  shadowProp: {
    // shadowColor: '#171717',
  },
  floorPlan: {
    height: 400,
    width: '80%',
    alignSelf: 'center',
    marginTop: 30,
  },
  floorPlanView: {
    textDecorationLine: 'underline',
    color: '#51D1FA',
    fontSize: 15,
    fontWeight: '500',
  },
  box: {
    width: wp(85),
    height: hp(10.7),
    marginTop: hp(2),
    bottom: hp(0),
    // position:'absolute',
    borderWidth: 1,
  },
  text: {
    fontSize: wp(2.7),
    fontWeight: '600',
    lineHeight: 15,
    marginLeft: 5,
  },
  legendDescription: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: wp(2),
  },
  circle: {
    marginTop: 4,
    backgroundColor: 'yellow',
    width: 11,
    height: 11,
    borderRadius: 50,
  },
  floorPlanContainer: {
    height: hp(56),
    width: wp(95),
    borderWidth: 0.5,
    marginTop: 10,
  },
});
export default observer(FloorPlanView);
