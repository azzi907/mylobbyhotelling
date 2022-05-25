/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Provider} from 'mobx-react';
import {Provider as PaperProvider} from 'react-native-paper';
import AppNavigator from './src/config/Navigation/AppNavigation';
import Store from './src/Store';
import { NavigationContainer } from "@react-navigation/native";


const App = () => {
  return (
    <Provider store={Store}>
      <PaperProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
};

const styles = StyleSheet.create({
  page: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  inputField: {
    width: '90%',
    height: 40,
    marginTop: 80,
  },
  startDateTime: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 40,
  },
  label: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 5,
  },
});

export default App;
