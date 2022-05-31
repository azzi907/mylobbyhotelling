/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import AppNavigator from './src/config/Navigation/AppNavigation';
import {MobXRootStore, MobXRootStoreContext} from './src/Store';
import {NavigationContainer} from '@react-navigation/native';
const mobXRootStore = new MobXRootStore();
const App = () => {
  return (
    <MobXRootStoreContext.Provider value={mobXRootStore}>
      <PaperProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </PaperProvider>
    </MobXRootStoreContext.Provider>
  );
};

export default App;
