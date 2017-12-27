import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ConstantsService } from './constants-service';
import { LoginService } from './login-service';
import { Daycare,Role,User,Sumups,Child,Educator,Parent } from '../pojo/pojo';
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';

@Injectable()
export class SumupServiceImpl implements SumupService{

  constructor(
      private http: Http,
      private constantService: ConstantsService,
      private loginService: LoginService
  ) {}

  getAllByChildId(idDaycare: number, idChild: number): Observable<Array<Sumups>> {
    console.log("getSumups " +idDaycare+" "+idChild);
    return this.http.get(this.constantService.API_ENDPOINT + "/daycares/" + idDaycare + "/childs/" + idChild + "/sumups/",this.loginService.getBearerToken())
      .map((response) => response.json()).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getOneByChildIdAndDay(idDaycare: number, idChild: number, daySumup: string): Observable<Sumups> {
    console.log("getSumup " +idDaycare+" "+idChild+" "+daySumup);
    console.log(this.constantService.API_ENDPOINT + "/daycares/" + idDaycare + "/childs/" + idChild + "/sumups/day/" + daySumup);
    return this.http.get(this.constantService.API_ENDPOINT + "/daycares/" + idDaycare + "/childs/" + idChild + "/sumups/day/" + daySumup,this.loginService.getBearerToken())
      .map((response) => response.json()).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  create(idDaycare: number, idChild: number, sumup: Sumups): Observable<Array<Sumups>> {

    let url: string = this.constantService.API_ENDPOINT + "/daycares/" + idDaycare + "/childs/" + idChild + "/sumups";
    let body = JSON.stringify(sumup);

    return this.http.post(url, body, this.loginService.getBearerToken()
    )
      .map((response) => response.json()).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  errorSubscribe(error) { console.log("Error happened : "); console.log( error) }
  completed() { console.log("the subscription is completed") }
}

@Injectable()
export abstract class SumupService {
  abstract getAllByChildId(idDaycare: number, idChild: number): Observable<Array<Sumups>>;
  abstract getOneByChildIdAndDay(idDaycare: number, idChild: number, daySumup: string): Observable<Sumups>;
  abstract create(idDaycare: number, idChild: number, sumup: Sumups): Observable<Array<Sumups>>;
  abstract errorSubscribe(error);
  abstract completed();
}