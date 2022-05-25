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
} from 'react-native';
import {Searchbar} from 'react-native-paper';
import ImageMapper from '../components/ImageMapper';
// import ImageMapper from '../components/ImageMapper';
// import ImageMapper from '../components/ImageMapper';
import Store from '../Store';
// import {ImageMapper} from 'react-native-image-mapper';

export default function FloorPlanView(this: any, props: any) {
  const BACK_ICON = require('../../images/back-icon.png');
  const RECT_RED = require('../../images/rectangle-red.png');
  const RECT_GREEN = require('../../images/rectangle-green.png');
  const CIRC_RED = require('../../images/circle-red.png');
  const CIRC_GREEN = require('../../images/circle-green.png');
  const img = require('../../images/human.png');
  const BACKEND_URL = Store.store.parameters.backendUrl;
  const [area, setArea] = React.useState<any>({});
  const [filteredArea, setFilteredArea] = React.useState<any>(null);
  const [Plan, setFloorPlan] = React.useState<any>(null);
  const [roomNameSelected, setRoomNameSelected] = React.useState('');
  const [roomIdSelected, setRoomIdSelected] = React.useState<any>(null);
  const [searchQuery, setSearchQuery] = React.useState('');

  const [rooms, setRooms] = useState<any>(null);

  const getRooms = async () => {
    const date1 = new Date();
    const date2 = new Date().setDate(date1.getDate() + 1);
    const requestOptions = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        accountId: Store.userStore.auth.employee.accountId,
        dateFrom: date1.getTime(),
        dateTo: new Date(date2).getTime(),
        isDesk: props.route.params.isDesk,
        isRoom: props.route.params.isRoom,
        isOffice: props.route.params.isOffice,
      }),
    };
    console.log('====================================');
    console.log(requestOptions);
    console.log('====================================');
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
    getRooms();
  }, []);

  const getFloorPlan = async () => {
    fetch(
      `${BACKEND_URL}/api/floor_plans/list?accountId=${Store.userStore.auth.employee.accountId}`,
    )
      .then(response => response.json())
      .then(result => {
        const floorPlan = result.floorPlans;
        console.log('====================================');
        console.log('floorPlan ===>', floorPlan);
        console.log('====================================');
        floorPlan[1].areaRN
          .forEach((ar: any) => {
            const isAvailable = rooms.find(
              (room: any) =>
                room.location === floorPlan[1].name &&
                room.name === ar.title &&
                room.isBlocked === false,
            );
            const blocked = rooms.find(
              (room: any) =>
                room.location === floorPlan[1].name &&
                room.name === ar.title &&
                room.isBlocked === true,
            );
            if (isAvailable) {
              ar.fill = 'green';
            } else if (blocked) {
              ar.fill = 'yellow';
            } else {
              ar.fill = 'red';
            }
            setArea(floorPlan[1].areaRN);
            setFilteredArea(floorPlan[1].areaRN);
            setFloorPlan(floorPlan[1]);
          })
          .catch((error: any) => {
            console.log('floor plan exception =>', error);
            ToastAndroid.show('Error Getting Floor Plan', ToastAndroid.LONG);
          });
      });
  };

  function mainImgWasPressed(item: any) {
    const resource = rooms.find((r: any) => r.name === item.name);

    props.navigation.navigate('BookNow', {
      ...props.route.params,
      roomId: resource.id,
      roomName: resource.name,
    });
  }

  React.useEffect(() => {
    if (rooms) {
      getFloorPlan();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rooms]);

  React.useEffect(() => {
    if (Plan) {
      console.log(
        `${BACKEND_URL}/resources/floorplans/${Store.userStore.auth.employee.sites[0]}/${Plan.file}`,
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Plan]);
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
          <Text style={{marginLeft: 20, fontWeight: '600'}}>
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
              });
            }}>
            <Text style={{fontSize: 20, fontWeight: '600'}}>List View</Text>
          </TouchableOpacity>
        </View>
        <Searchbar
          placeholder="Search"
          value={searchQuery}
          style={{marginTop: 10, borderRadius: 10}}
        />
        <Text style={{marginTop: 10}}>Today: {props.route.params.date}</Text>
        {Plan?.file ? (
          <ScrollView horizontal={true}>
            <ScrollView nestedScrollEnabled>
              <ImageMapper
                imgHeight={Plan.imageDim[1]}
                imgWidth={Plan.imageDim[0]}
                imgSource={`${BACKEND_URL}/resources/floorplans/${Store.userStore.auth.employee.sites[0]}/${Plan.file}`}
                imgMap={area}
                onPress={(item: any, idx: any, event: any) =>
                  mainImgWasPressed(item)
                }
                containerStyle={{top: 10}}
                selectedAreaId={'0'}
              />
            </ScrollView>
          </ScrollView>
        ) : null}
      </View>
      <View style={styles.box}>
        <Text style={{alignSelf: 'center', fontWeight: '600'}}>Legend</Text>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop: 5,
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
            <View style={styles.circle} />
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
    fontSize: 20,
    fontWeight: '600',
  },
  box: {
    width: '70%',
    height: 70,
    marginTop: 30,
    borderWidth: 1,
  },
  text: {
    fontSize: 10,
    fontWeight: '600',
    lineHeight: 15,
    marginLeft: 5,
  },
  legendDescription: {
    display: 'flex',
    flexDirection: 'row',
  },
  circle: {
    marginTop: 4,
    backgroundColor: 'yellow',
    width: 11,
    height: 11,
    borderRadius: 50,
  },
});
