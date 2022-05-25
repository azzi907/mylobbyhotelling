import {observable, action} from 'mobx';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Auth {
  employee: any;
  sites: any;
  siteId: number;
  siteName: string;
}

export default class UserAuth {
  @observable auth: Auth = {
    employee: {},
    sites: {},
    siteId: -1,
    siteName: '',
  };

  @observable navigation: any;

  @action
  async init() {
    let auth = await AsyncStorage.getItem('auth');
    if (auth) {
      this.auth = JSON.parse(auth);
    }
  }

  @action
  async update(type: string, value: any) {
    let updatedAuth: any = this.auth;
    updatedAuth[type] = value;
    await AsyncStorage.setItem('auth', JSON.stringify(updatedAuth));
    this.auth = updatedAuth;
  }

  @action
  async updateAll(auth: any) {
    await AsyncStorage.setItem('auth', JSON.stringify(auth));
    this.auth = auth;
  }

  async saveToAsync() {
    await AsyncStorage.setItem('auth', JSON.stringify(this.auth));
  }
}
