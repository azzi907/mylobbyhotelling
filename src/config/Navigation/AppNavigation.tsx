import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../../screens/LoginScreen';
import EventScreen from '../../screens/EventScreen';
import Init from '../../screens/Init';
import BookingScreen from '../../screens/BookingScreen';
import ReservationScreen from '../../screens/ReservationScreen';
import SelectViewsScreen from '../../screens/SelectViewsScreen';
import ListViewSreen from '../../screens/ListViewScreen';
import FloorPLanViewScreen from '../../screens/FloorPlanViewScreen';
import BookNowScreen from '../../screens/BookNowScreen';
import BookedScreen from '../../screens/BookedScreen';

type StackParamList = {
  Init: undefined;
  Login: undefined;
  Event: undefined;
  Booking: undefined;
  Reservation: undefined;
  SelectViews: undefined;
  ListView: undefined;
  FloorPlanView: undefined;
  BookNow: undefined;
  Booked: undefined;
};

const Stack = createNativeStackNavigator<StackParamList>();

export default () => {
  return (
    <Stack.Navigator
      initialRouteName="Init"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Init" component={Init} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Event" component={EventScreen} />
      <Stack.Screen name="Booking" component={BookingScreen} />
      <Stack.Screen name="Reservation" component={ReservationScreen} />
      <Stack.Screen name="SelectViews" component={SelectViewsScreen} />
      <Stack.Screen name="ListView" component={ListViewSreen} />
      <Stack.Screen name="FloorPlanView" component={FloorPLanViewScreen} />
      <Stack.Screen name="BookNow" component={BookNowScreen} />
      <Stack.Screen name="Booked" component={BookedScreen} />
    </Stack.Navigator>
  );
};
