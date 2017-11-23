import {Injectable} from '@angular/core';

@Injectable()
export class ConstantsService {

API_ENDPOINT :string;

constructor() {
    this.API_ENDPOINT = 'http://192.168.0.101:8081';
  }
}