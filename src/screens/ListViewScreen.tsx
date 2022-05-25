/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import {Searchbar} from 'react-native-paper';
import Store from '../Store';

export default function ListView(props: any) {
  const BACK_ICON = require('../../images/back-icon.png');
  const [searchQuery, setSearchQuery] = React.useState('');
  const BACKEND_URL = Store.store.parameters.backendUrl;
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
        console.log(rooms);
      })
      .catch(error => {
        console.log(error);
        ToastAndroid.show('Error saving ical', ToastAndroid.LONG);
      });
  };
  useEffect(() => {
    getRooms();
  }, []);

  // const date = new Date(); // 2009-11-10
  // const month = date.toLocaleString('default', {month: 'long'});
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
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('FloorPlanView', {
                date: props.route.params.date,
                rooms: props.route.params.room,
              });
            }}>
            <Text style={{fontSize: 20, fontWeight: '600'}}>
              Floor Plan View
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.listView}>List View</Text>
          </TouchableOpacity>
        </View>
        <Searchbar
          placeholder="Search"
          value={searchQuery}
          style={{marginTop: 10, borderRadius: 10}}
        />
        <Text style={{marginTop: 10}}>Today: {props.route.params.date}</Text>
        <ScrollView style={{height: '75%'}}>
          {rooms?.map((roomData: any) => {
            return (
              <View style={[styles.box, styles.shadowProp]} key={roomData.id}>
                <View style={styles.box2}>
                  <Image
                    style={styles.menuimg}
                    source={{
                      uri: `${BACKEND_URL}/api/rooms/getAvatar/${roomData.id}?small=true`,
                    }}
                  />
                  <View style={{padding: 15}}>
                    <Text
                      style={{
                        marginLeft: 10,
                        fontSize: 20,
                        fontWeight: '700',
                      }}>
                      {roomData.name}
                    </Text>
                    <Text style={styles.headings}>{roomData.location}</Text>
                    <Text style={styles.headings}>
                      Capacity : {roomData.capacity}
                    </Text>
                    <Text style={styles.headings}>
                      AV: {roomData.description}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    props.navigation.navigate('BookNow', {
                      roomName: roomData.name,
                      roomId: roomData.id,
                      ...props.route.params,
                    });
                  }}>
                  <Text style={styles.bookNow}>Book Now</Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </ScrollView>
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
  text: {
    marginTop: 50,
    padding: 80,
    textAlign: 'center',
    fontWeight: '600',
  },
  box: {
    width: '100%',
    height: 170,
    borderWidth: 1,
    marginTop: 20,
    borderRadius: 30,
  },
  box2: {
    height: '75%',
    display: 'flex',
    flexDirection: 'row',
  },
  menuimg: {
    marginLeft: 10,
    marginTop: 15,
    width: 100,
    height: 100,
  },
  shadowProp: {
    // shadowColor: '#171717',
  },
  listView: {
    textDecorationLine: 'underline',
    color: '#51D1FA',
    fontSize: 20,
    fontWeight: '600',
  },
  bookNow: {
    height: '50%',
    backgroundColor: '#51D1FA',
    textAlign: 'center',
    fontSize: 25,
    textAlignVertical: 'center',
    color: 'white',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headings: {
    marginLeft: 10,
    fontSize: 12,
    fontWeight: '600',
  },
});
