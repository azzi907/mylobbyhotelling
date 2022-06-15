/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Button, TextInput} from 'react-native-paper';
import {useRootStoreContext} from '../Store/index';
import {observer} from 'mobx-react';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Loader from '../components/Loader';
// import AnimatedLoader from 'react-native-animated-loader';

const SignUpScreen = (props: any) => {
  const {store} = useRootStoreContext();

  const LOGO = require('../../images/myLobbyLogo.png');
  const BACKEND_URL = store.parameters.backendUrl;
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [company, setCompany] = useState('');
  const [ste, setSte] = useState(true);
  const [eye, setEye] = useState('eye');
  const [isDisabled, setIsDisabled] = useState(true);
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    if (
      email === '' ||
      password === '' ||
      company === '' ||
      firstName === '' ||
      LastName === ''
    ) {
      return;
    }
    setIsDisabled(false);
  }, [email, password, company, firstName, LastName]);

  const handleSignUp = async () => {
    if (validateEmail(email)) {
      console.log('Truee');
      setisLoading(true);
      var myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');
      var raw = JSON.stringify({
        email: email,
        firstName: firstName,
        lastName: LastName,
        company: company,
        password: password,
        hotelingApp: true,
      });
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
      };
      fetch(`${BACKEND_URL}/api/users/register`, requestOptions)
        .then(response => response.json())
        .then((result: any) => {
          if (result.token) {
            if (Platform.OS === 'android') {
              ToastAndroid.show(
                'Check Your Email for Activation Link',
                ToastAndroid.LONG,
              );
            } else {
              Alert.alert('Check Your Email for Activation Link');
            }
          }
          else if (result.error){
            if (Platform.OS === 'android') {
              ToastAndroid.show(
                result.error.message,
                ToastAndroid.LONG,
              );
            } else {
              Alert.alert(result.error.message);
            }
          }
          setisLoading(false);
          props.navigation.navigate('Login');
        } )
        .catch(error => console.log('error  ==>', error));
    } else {
      setError(true);
    }
  };
  const validateEmail = (email: any) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      );
  };
  return (
    <View style={styles.page}>
      {isLoading ? (
        <Loader />
      ) : (
        <View
          style={{
            alignItems: 'center',
          }}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <ScrollView>
              <Text style={styles.welcome}>
                Welcome to MyLobby Hoteling App
              </Text>
              <View style={styles.companyLogoContainer}>
                <Image
                  resizeMode="contain"
                  source={LOGO}
                  style={styles.image}
                />
              </View>
              <View>
                <View style={styles.inputField}>
                  <TextInput
                    mode="outlined"
                    label="First Name"
                    value={firstName}
                    selectionColor={'black'}
                    keyboardType={'email-address'}
                    outlineColor={'blue'}
                    right={
                      <TextInput.Icon
                        name="account-outline"
                        color={'#03A9F4'}
                      />
                    }
                    onChangeText={text => setFirstName(text)}
                  />
                </View>
                <View style={styles.inputField}>
                  <TextInput
                    mode="outlined"
                    label="Last Name"
                    value={LastName}
                    selectionColor={'black'}
                    keyboardType={'email-address'}
                    outlineColor={'blue'}
                    right={
                      <TextInput.Icon
                        name="account-outline"
                        color={'#03A9F4'}
                      />
                    }
                    onChangeText={text => setLastName(text)}
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
                    onFocus={()=>{
                      setError(false);
                    }}
                  />
                  {error ? (
                    <Text style={{color: 'red'}}>Invalid Email</Text>
                  ) : null}
                </View>
                <View style={[styles.inputField, {marginTop: error ? hp(6.5) : hp(4)}]}>
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
                    label="Company"
                    value={company}
                    selectionColor={'black'}
                    keyboardType={'default'}
                    right={
                      <TextInput.Icon
                        name="office-building"
                        color={'#03A9F4'}
                      />
                    }
                    outlineColor={'blue'}
                    onChangeText={t => setCompany(t)}
                  />
                </View>
                <View style={{...styles.inputField, marginTop: 55}}>
                  <Button
                    disabled={isDisabled}
                    mode="contained"
                    onPress={() => {
                      handleSignUp();
                    }}>
                    <Text>Sign Up</Text>
                  </Button>
                </View>
                <View style={styles.signUp}>
                  <Text>Already have a Account ?</Text>
                  <TouchableOpacity
                    onPress={() => {
                      props.navigation.navigate('Login', {
                        ...props.route.params,
                      });
                    }}>
                    <Text style={styles.signUpText}>Login</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcome: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: '600',
    marginTop: hp(5),
  },
  companyLogoContainer: {
    width: 242,
    height: hp(13),
    flexDirection: 'row',
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
    alignSelf: 'center',
    width: '100%',
    height: 40,
    marginTop: hp(4),
  },
  signUp: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  signUpText: {
    textDecorationLine: 'underline',
    color: '#2F8AF5',
    fontStyle: 'italic',
  },
  lottie: {
    width: 100,
    height: 100,
  },
});

export default observer(SignUpScreen);
