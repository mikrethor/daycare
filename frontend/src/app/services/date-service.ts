import {Injectable} from '@angular/core';
import 'rxjs/Rx';
import * as moment from 'moment';

@Injectable()
export class DateService {

    getCurrentDay():string{
       return moment(new Date()).format('YYYY-MM-DD');
    }
}