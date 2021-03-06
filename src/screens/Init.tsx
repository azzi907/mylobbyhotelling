import React from 'react';
import {useRootStoreContext} from '../Store/index';
import {View} from 'react-native';
import {ActivityIndicator, Caption} from 'react-native-paper';
import {observer} from 'mobx-react-lite';
import {useFocusEffect} from '@react-navigation/native';
import {isEmpty} from 'lodash';

export default observer((props: any) => {
  const {store, userStore} = useRootStoreContext();

  const bootstrap = async () => {
    await store.init();
    await userStore.init();
    if (!isEmpty(userStore.auth.sites) && !isEmpty(userStore.auth.employee)) {
      userStore.update('logout', false);
      props.navigation.navigate('Booking');
    } else {
      props.navigation.navigate('Login');
    }
  };

  useFocusEffect(() => {
    bootstrap();
  });

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <View style={{marginVertical: 10}}>
        <ActivityIndicator />
      </View>
      <Caption>Initialising...</Caption>
    </View>
  );
});
