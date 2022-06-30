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
  Dimensions,
  Platform,
} from 'react-native';
const {height, width} = Dimensions.get('window');
const aspectRatio = height / width;
import {Searchbar} from 'react-native-paper';
import {useRootStoreContext} from '../Store';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

function ListView(props: any) {
  const {store, userStore} = useRootStoreContext();

  const BACK_ICON = require('../../images/back-icon.png');
  const [searchQuery, setSearchQuery] = React.useState('');
  const BACKEND_URL = store.parameters.backendUrl;
  const [rooms, setRooms] = useState<any>(null);

  const [filteredRooms, setFilteredRooms] = useState<any>(null);
  useEffect(() => {
    getRooms();
  }, []);
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
        if (
          userStore.auth.employee.category === 'C' ||
          userStore.auth.employee.category === undefined ||
          userStore.auth.employee.category === null
        ) {
          setFilteredRooms(result.rooms);
        } else {
          const newCheckRooms: any = [];
          result.rooms?.forEach((room: any) => {
            const isAvailable =
              room.category === userStore.auth.employee.category;
            if (isAvailable) {
              newCheckRooms.push(room);
            }
          });
          setFilteredRooms(newCheckRooms);
        }
      })
      .catch(error => {
        console.log(error);
        ToastAndroid.show('Error fetching Available Rooms', ToastAndroid.LONG);
      });
  };

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
              props.navigation.navigate('Booking', {...props.route.params});
            }}>
            <Image
              style={{marginTop: 3, height: hp(1.5), width: wp(2.5)}}
              source={BACK_ICON}
            />
            <Text style={{color: '#51D1FA', marginLeft: 4, fontSize: hp(1.7)}}>
              Back
            </Text>
          </TouchableOpacity>
          <Text
            style={{marginLeft: wp(5), fontWeight: '500', fontSize: hp(1.5)}}>
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
            <Text style={{fontSize: hp(2), fontWeight: '500'}}>
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
          style={{
            marginTop: hp(1.5),
            borderRadius: hp(2),
            height: hp(6),
            fontSize: hp(5),
          }}
        />
        {
          <ScrollView
            style={{height: '80%'}}
            showsVerticalScrollIndicator={false}>
            {filteredRooms?.map((roomData: any) => {
              return (
                <View
                  style={
                    Platform.OS === 'ios'
                      ? styles.boxShadow
                      : styles.boxShadowAndroid
                  }
                  key={roomData.id}>
                  <View
                    style={[
                      styles.box,
                      {height: aspectRatio > 1.6 ? hp(21) : hp(24)},
                    ]}
                    key={roomData.id}>
                    <View
                      style={[
                        styles.box2,
                        {height: aspectRatio > 1.6 ? hp(16.5) : hp(20)},
                      ]}>
                      <Image
                        style={[
                          styles.menuimg,
                          {
                            width: wp(30),
                            height: aspectRatio > 1.6 ? hp(13) : hp(16),
                          },
                        ]}
                        source={{
                          uri: `${BACKEND_URL}/api/rooms/getAvatar/${roomData.id}?small=true`,
                        }}
                      />
                      <View style={{padding: 15}}>
                        <View style={{width:wp(54)}}>
                          <Text
                            numberOfLines={1}
                            ellipsizeMode='tail'
                            style={{
                              marginLeft: wp(2),
                              fontSize: wp(5),
                              fontWeight: '700',
                            }}>
                            {roomData.name}
                          </Text>
                        </View>

                        <Text style={styles.headings}>{roomData.location}</Text>
                        <Text style={styles.headings}>
                          Category:{' '}
                          {roomData.category === 'A' ? 'Regular' : 'Executive'}
                        </Text>
                        <Text style={styles.headings}>
                          Capacity: {roomData.capacity}
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
                          floorName: roomData.location,
                          ...props.route.params,
                        });
                      }}>
                      <View style={styles.bookNow}>
                        <Text style={styles.bookNowText}>Book Now</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}
          </ScrollView>
        }
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    width: wp(100),
    height: '100%',
    backgroundColor: '#f9f2f2',
    alignItems: 'center',
  },
  container: {
    width: '95%',
    height: '99.5%',
    alignSelf: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  text: {
    marginTop: 50,
    padding: 80,
    textAlign: 'center',
    fontWeight: '500',
  },
  box: {
    marginLeft: wp(1),
    width: '98%',
    marginTop: 20,
    borderRadius: wp(8),
    overflow: 'hidden',
    backgroundColor: 'white',
  },
  box2: {
    display: 'flex',
    flexDirection: 'row',
  },
  menuimg: {
    marginLeft: wp(3),
    marginTop: hp(2),
    borderRadius: wp(4),
  },
  listView: {
    textDecorationLine: 'underline',
    color: '#51D1FA',
    fontSize: hp(2),
    fontWeight: '600',
  },
  bookNow: {
    height: hp(50),
    backgroundColor: '#51D1FA',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  bookNowText: {
    textAlign: 'center',
    fontSize: hp(3),
    textAlignVertical: 'center',
    color: 'white',
  },
  headings: {
    marginLeft: wp(3.5),
    fontSize: hp(2),
    fontWeight: '500',
  },
  boxShadow: {
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 3,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 1,
  },
  boxShadowAndroid: {
    elevation: 0,
  },
});
export default observer(ListView);
