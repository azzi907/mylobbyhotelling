/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Keyboard,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Button, TextInput} from 'react-native-paper';
import store from '../Store/index';
import {cloneDeep, filter, includes, toLower} from 'lodash';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = (props: any) => {
  const BACKEND_URL = store.store.parameters.backendUrl;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [ste, setSte] = useState(true);
  const [eye, setEye] = useState('eye');
  const [sites, setSites] = useState<any>();
  const [siteId, setSiteId] = useState<any>('');
  // const [keyboardOffset, setKeyboardOffset] = useState(0);
  const [isDisabled, setIsDisabled] = useState(true);


  useEffect(() => {
    if (email === '' || password === '' || siteId === null) {
      return;
    }
    setIsDisabled(false);
  }, [email, password, siteId]);

  // useEffect(() => {
  //   const showSubscription = Keyboard.addListener('keyboardDidShow', event => {
  //     setKeyboardOffset(event.endCoordinates.height);
  //   });
  //   const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
  //     setKeyboardOffset(0);
  //   });

  //   return () => {
  //     showSubscription.remove();
  //     hideSubscription.remove();
  //   };
  // }, []);

  const handleLogin = async () => {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      email: email,
      password: password,
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch(`${BACKEND_URL}/api/employees/login?siteId=${siteId}`, requestOptions)
      .then(response => response.json())
      .then((result: any) => {
        console.log('resut ===>', result);
        AsyncStorage.setItem('token', result.success.token);
        store.userStore.update('employee', result.success.employee);
        AsyncStorage.setItem(
          'employee',
          JSON.stringify(result.success.employee),
        );
        var date = new Date();
        date.setDate(date.getDate() + 1);
        AsyncStorage.setItem('tokenExpiration', JSON.stringify(date));
        var requestOptionsGet = {
          method: 'GET',
          redirect: 'follow',
        };
        fetch(
          `${BACKEND_URL}/api/employees/sites?token=${result.success.token}&accountId=${result.success.employee.accountId}`,
          requestOptionsGet,
        )
          .then(response => response.json())
          .then(sitesResult => {
            console.log('result sites ==>', sitesResult.success);
            const siteArray: any = [];
            sitesResult.success.forEach((site: any) => {
              siteArray.push({id: site.id, name: site.name});
            });
            store.userStore.update('sites', siteArray);
            store.userStore.update('siteId', siteId);
            AsyncStorage.setItem('sites', JSON.stringify(siteArray));
            AsyncStorage.setItem('siteId', siteId.toString());

            props.navigation.navigate('Init');
          });
      })
      .catch(error => console.log('error  ==>', error));
    // localStorage.setItem('token', response.data.success.token);
    //   localStorage.setItem('employee', JSON.stringify(response.data.success.employee));
    // var date = new Date();
    // date.setDate(date.getDate() + 1);
    //   localStorage.setItem('tokenExpiration', date);
    //   const sites = await getSites();
    //   setTimeout(() => {
    //     localStorage.setItem('sites', JSON.stringify(sites));
    //     setSites(sites);
    //     setEmployee(response.data.success.employee);
    //     setPage(0);
    //   }, 3000);
  };

  return (
    <View style={styles.page}>
      <View
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          // bottom: keyboardOffset,
        }}>
        <ScrollView>
          <Text style={styles.welcome}>Welcome to MyLobby Hotteling App</Text>
          <View style={styles.companyLogoContainer}>
            <Image
              resizeMode="contain"
              source={{uri: `${BACKEND_URL}/api/globalopts/logo`}}
              style={styles.image}
            />
          </View>
          <View style={styles.inputField}>
            <TextInput
              mode="outlined"
              label="Email"
              value={email}
              selectionColor={'black'}
              keyboardType={'email-address'}
              outlineColor={'blue'}
              right={<TextInput.Icon name="mail" color={'#03A9F4'} />}
              onChangeText={text => setEmail(text)}
            />
          </View>
          <View style={styles.inputField}>
            <TextInput
              mode="outlined"
              label="Password"
              value={password}
              selectionColor={'black'}
              secureTextEntry={ste}
              keyboardType={'default'}
              right={
                <TextInput.Icon
                  name={eye}
                  onPress={() => {
                    setSte(!ste);
                    setEye(eye === 'eye' ? 'eye-off' : 'eye');
                  }}
                  color={'#03A9F4'}
                />
              }
              outlineColor={'blue'}
              onChangeText={text => setPassword(text)}
            />
          </View>
          <View style={styles.inputField}>
            <TextInput
              mode="outlined"
              label="Site"
              value={siteId.toString()}
              selectionColor={'black'}
              keyboardType={'default'}
              outlineColor={'blue'}
              onChangeText={t => setSiteId(parseInt(t, 10))}
            />
          </View>
          <View style={{...styles.inputField, marginTop: 80}}>
            <Button
              disabled={isDisabled}
              mode="contained"
              onPress={handleLogin}>
              Login
            </Button>
          </View>
        </ScrollView>
      </View>
    </View>
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
  welcome: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 90,
  },
  companyLogoContainer: {
    width: 242,
    height: '16.667%',
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'flex-start',
    alignSelf: 'center',
    marginTop: 30,
  },
  image: {
    height: 130,
    width: 200,
  },
  inputField: {
    width: '90%',
    height: 40,
    marginTop: 50,
  },
});

export default LoginScreen;
