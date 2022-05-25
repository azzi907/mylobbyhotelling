import {observable, action} from 'mobx';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Parameter {
  backendUrl:
    | 'https://eme.my-lobby.com'
    | 'https://admin.my-lobby.com'
    | 'http://192.168.5.47:3000';
}

export default class State {
  @observable parameters: Parameter = {
    backendUrl: 'https://eme.my-lobby.com',
  };

  @action
  async init() {
    let parameters = await AsyncStorage.getItem('parameters');
    if (parameters) {
      this.parameters = JSON.parse(parameters);
    }
  }

  @action
  async update(type: string, value: any) {
    let updatedParameters: any = this.parameters;
    updatedParameters[type] = value;
    await AsyncStorage.setItem('parameters', JSON.stringify(updatedParameters));
    this.parameters = updatedParameters;
  }

  async saveToAsync() {
    await AsyncStorage.setItem('parameters', JSON.stringify(this.parameters));
  }
}
