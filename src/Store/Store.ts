import {action, makeAutoObservable} from 'mobx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MobXRootStore from '.';
import {makePersistable} from 'mobx-persist-store';

interface Parameter {
  backendUrl:
    | 'https://eme.my-lobby.com'
    | 'https://admin.my-lobby.com'
    | 'http://192.168.5.47:3000';
}

export default class State {
  parameters: Parameter = {
    backendUrl: 'https://eme.my-lobby.com',
  };

  constructor(public mobXRootStore: MobXRootStore) {
    makeAutoObservable(this, {});
    makePersistable(this, {
      name: 'State',
      properties: ['parameters'],
      storage: AsyncStorage,
    });
  }

  async init() {
    let parameters = await AsyncStorage.getItem('parameters');
    if (parameters) {
      this.parameters = JSON.parse(parameters);
    }
  }

  async update(type: string, value: any) {
    let updatedParameters: any = this.parameters;
    updatedParameters[type] = value;
    this.parameters = updatedParameters;
  }

  async saveToAsync() {
    await AsyncStorage.setItem('parameters', JSON.stringify(this.parameters));
  }
}
