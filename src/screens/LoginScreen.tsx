import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from ‘react-native’;
import React, {useEffect, useState} from ‘react’;
import {Button, TextInput} from ‘react-native-paper’;
import {useRootStoreContext} from ‘../Store/index’;
import AsyncStorage from ‘@react-native-async-storage/async-storage’;
import {observer} from ‘mobx-react’;
const LoginScreen = (props: any) => {
  const {store, userStore} = useRootStoreContext();
  const LOGO = require(‘../../images/myLobbyLogo.png’);
  const BACKEND_URL = store.parameters.backendUrl;
  const [email, setEmail] = useState(‘’);
  const [password, setPassword] = useState(‘’);
  const [ste, setSte] = useState(true);
  const [eye, setEye] = useState(‘eye’);
  const [siteId, setSiteId] = useState<any>();
  const [isDisabled, setIsDisabled] = useState(true);
  useEffect(() => {
    if (email === ‘’ || password === ‘’ || siteId === null) {
      return;
    }
    setIsDisabled(false);
  }, [email, password, siteId]);
  const handleLogin = async () => {
    var myHeaders = new Headers();
    myHeaders.append(‘Content-Type’, ‘application/json’);
    var raw = JSON.stringify({
      email: email,
      password: password,
    });
    var requestOptions = {
      method: ‘POST’,
      headers: myHeaders,
      body: raw,
      redirect: ‘follow’,
    };
    fetch(`${BACKEND_URL}/api/employees/login?siteId=${siteId}`, requestOptions)
      .then(response => response.json())
      .then((result: any) => {
        console.log(‘Result ===>’, result);
        AsyncStorage.setItem(‘token’, result.success.token);
        userStore.update(‘employee’, result.success.employee);
        AsyncStorage.setItem(
          ‘employee’,
          JSON.stringify(result.success.employee),
        );
        var date = new Date();
        date.setDate(date.getDate() + 1);
        AsyncStorage.setItem(‘tokenExpiration’, JSON.stringify(date));
        var requestOptionsGet = {
          method: ‘GET’,
          redirect: ‘follow’,
        };
        fetch(
          `${BACKEND_URL}/api/employees/sites?token=${result.success.token}&accountId=${result.success.employee.accountId}`,
          requestOptionsGet,
        )
          .then(response => response.json())
          .then(sitesResult => {
            const siteArray: any = [];
            sitesResult.success.forEach((site: any) => {
              siteArray.push({id: site.id, name: site.name});
            });
            userStore.update(‘sites’, siteArray);
            userStore.update(‘siteId’, siteId);
            props.navigation.navigate(‘Init’);
          });
      })
      .catch(error => console.log(‘error  ==>’, error));
  };
  return (
    <View style={styles.page}>
      <View
        style={{
          alignItems: ‘center’,
        }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === ‘ios’ ? ‘padding’ : ‘height’}>
          <ScrollView>
            <Text style={styles.welcome}>Welcome to MyLobby Hoteling App</Text>
            <View style={styles.companyLogoContainer}>
              <Image resizeMode=“contain” source={LOGO} style={styles.image} />
            </View>
            <View>
              <View style={styles.inputField}>
                <TextInput
                  mode=“outlined”
                  label=“Email”
                  value={email}
                  selectionColor={‘black’}
                  keyboardType={‘email-address’}
                  outlineColor={‘blue’}
                  right={<TextInput.Icon name=“mail” color={‘#03A9F4’} />}
                  onChangeText={text => setEmail(text)}
                />
              </View>
              <View style={styles.inputField}>
                <TextInput
                  mode=“outlined”
                  label=“Password”
                  value={password}
                  selectionColor={‘black’}
                  secureTextEntry={ste}
                  keyboardType={‘default’}
                  right={
                    <TextInput.Icon
                      name={eye}
                      onPress={() => {
                        setSte(!ste);
                        setEye(eye === ‘eye’ ? ‘eye-off’ : ‘eye’);
                      }}
                      color={‘#03A9F4’}
                    />
                  }
                  outlineColor={‘blue’}
                  onChangeText={text => setPassword(text)}
                />
              </View>
              <View style={styles.inputField}>
                <TextInput
                  mode=“outlined”
                  label=“Site”
                  value={siteId}
                  selectionColor={‘black’}
                  keyboardType={‘default’}
                  outlineColor={‘blue’}
                  onChangeText={t => setSiteId(parseInt(t, 10))}
                />
              </View>
              <View style={{...styles.inputField, marginTop: 80}}>
                <Button
                  disabled={isDisabled}
                  mode=“contained”
                  onPress={handleLogin}>
                  Login
                </Button>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  page: {
    width: ’100%’,
    height: ‘100%’,
    backgroundColor: ‘white’,
    justifyContent: ‘center’,
    alignItems: ‘center’,
  },
  welcome: {
    alignSelf: ‘center’,
    fontSize: 20,
    fontWeight: ‘600’,
    marginTop: 90,
  },
  companyLogoContainer: {
    width: 242,
    height: ’16.667%’,
    flexDirection: ‘row’,
    display: ‘flex’,
    justifyContent: ‘center’,
    alignContent: ‘flex-start’,
    alignSelf: ‘center’,
    marginTop: 30,
  },
  image: {
    height: 130,
    width: 200,
  },
  inputField: {
    alignSelf: ‘center’,
    width: ’100%’,
    height: 40,
    marginTop: 50,
  },
});
export default observer(LoginScreen);