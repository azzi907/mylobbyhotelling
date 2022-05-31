import {makeAutoObservable} from 'mobx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MobXRootStore} from '.';
import {makePersistable} from 'mobx-persist-store';

interface Auth {
  employee: any;
  sites: any;
  siteId: number;
  siteName: string;
  logout: boolean;
}

export default class UserAuth {
  auth: Auth = {
    employee: {},
    sites: {},
    siteId: -1,
    siteName: '',
    logout: true,
  };

  navigation: any;

  constructor(public mobXRootStore: MobXRootStore) {
    makeAutoObservable(this, {});
    makePersistable(this, {
      name: 'UserAuth',
      properties: ['auth', 'navigation'],
      storage: AsyncStorage,
    });
  }

  async init() {
    let auth = await AsyncStorage.getItem('auth');
    if (auth) {
      this.auth = JSON.parse(auth);
    }
  }

  async update(type: string, value: any) {
    let updatedAuth: any = this.auth;
    updatedAuth[type] = value;
    this.auth = updatedAuth;
  }

  async updateAll(auth: any) {
    await AsyncStorage.setItem('auth', JSON.stringify(auth));
    this.auth = auth;
  }

  async saveToAsync() {
    await AsyncStorage.setItem('auth', JSON.stringify(this.auth));
  }
}
