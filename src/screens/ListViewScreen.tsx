/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {observer} from 'mobx-react-lite';
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
import {useRootStoreContext} from '../Store';

function ListView(props: any) {
  const {store, userStore} = useRootStoreContext();

  const BACK_ICON = require('../../images/back-icon.png');
  const [searchQuery, setSearchQuery] = React.useState('');
  const BACKEND_URL = store.parameters.backendUrl;
  const [rooms, setRooms] = useState<any>(null);

  const [filteredRooms, setFilteredRooms] = useState<any>(null);
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
        accountId: userStore.auth.employee.accountId,
        dateFrom: date1.getTime(),
        dateTo: new Date(date2).getTime(),
        isDesk: props.route.params.isDesk,
        isRoom: props.route.params.isRoom,
        isOffice: props.route.params.isOffice,
      }),
    };
    fetch(`${BACKEND_URL}/api/rooms/availableList`, requestOptions)
      .then(response => response.json())
      .then(result => {
        setRooms(result.rooms);
        setFilteredRooms(result.rooms);
      })
      .catch(error => {
        console.log(error);
        ToastAndroid.show('Error fetching Available Rooms', ToastAndroid.LONG);
      });
  };
  useEffect(() => {
    getRooms();
  }, []);

  useEffect(() => {
    setFilteredRooms(() => {
      if (searchQuery) {
        const filteredData = rooms.filter((element: any) => {
          return element.name.toLowerCase().includes(searchQuery.toLowerCase());
        });
        return filteredData;
      } else {
        return filteredRooms;
      }
    });
  }, [searchQuery]);

  const onChangeSearch = (query: React.SetStateAction<string>) => {
    setSearchQuery(query);
  };
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
                ...props.route.params,
              });
            }}>
            <Text style={{fontSize: 15, fontWeight: '500'}}>
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
          onChangeText={onChangeSearch}
          style={{marginTop: 10, borderRadius: 10}}
        />
        <Text style={{marginTop: 10}}>Today: {userStore.auth.date}</Text>
        <ScrollView
          style={{height: '75%'}}
          showsVerticalScrollIndicator={false}>
          {filteredRooms?.map((roomData: any) => {
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
    fontWeight: '500',
  },
  box: {
    width: '100%',
    height: 170,
    borderWidth: 1,
    marginTop: 20,
    borderRadius: 30,
    overflow: 'hidden',
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
    fontSize: 15,
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
export default observer(ListView);
