import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../../screens/LoginScreen';
import Init from '../../screens/Init';
import BookingScreen from '../../screens/BookingScreen';
import ReservationScreen from '../../screens/ReservationScreen';
import SelectViewsScreen from '../../screens/SelectViewsScreen';
import ListViewSreen from '../../screens/ListViewScreen';
import FloorPLanViewScreen from '../../screens/FloorPlanViewScreen';
import BookNowScreen from '../../screens/BookNowScreen';
import BookedScreen from '../../screens/BookedScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MyMeetingsScreen from '../../screens/MyMeetingsScreen';
import CustomTabBar from '../../components/CustomBar';
import FindAColleague from '../../screens/FindAColleagueScreen';
import SignUpScreen from '../../screens/SignUpScreen';

type StackParamList = {
  Init: undefined;
  Login: undefined;
  Booking: undefined;
  Reservation: undefined;
  SelectViews: undefined;
  ListView: undefined;
  FloorPlanView: undefined;
  BookNow: undefined;
  Booked: undefined;
  Home: undefined;
  MyMeetings: undefined;
  FindColleagues: undefined;
  SignUp: undefined;
};

const Stack = createNativeStackNavigator<StackParamList>();

function MainNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Init"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Booking" component={BookingScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="Init" component={Init} />
      <Stack.Screen name="Reservation" component={ReservationScreen} />
      <Stack.Screen name="SelectViews" component={SelectViewsScreen} />
      <Stack.Screen name="ListView" component={ListViewSreen} />
      <Stack.Screen name="FloorPlanView" component={FloorPLanViewScreen} />
      <Stack.Screen name="BookNow" component={BookNowScreen} />
      <Stack.Screen name="Booked" component={BookedScreen} />
    </Stack.Navigator>
  );
}
const Tab = createBottomTabNavigator();

export default () => {
  return (
    <Tab.Navigator
      screenOptions={{headerShown: false}}
      tabBar={props => <CustomTabBar {...props} />}>
      <Tab.Screen name="Main" component={MainNavigator} />
      <Tab.Screen name="FindColleagues" component={FindAColleague} />
      <Tab.Screen name="MyMeetings" component={MyMeetingsScreen} />
    </Tab.Navigator>
  );
};
