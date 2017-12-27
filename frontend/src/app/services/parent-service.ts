import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ConstantsService } from './constants-service';
import { LoginService } from './login-service';
import { Daycare,Role,User,Sumups,Child,Educator,Parent } from '../pojo/pojo';
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';

@Injectable()
export class ParentServiceImpl implements ParentService{

  constructor(
      private http: Http,
      private constantService: ConstantsService,
      private loginService: LoginService
  ) {}


  getParent(idDaycare: number, idParent: number): Observable<Parent> {
    console.log("getEducator " +idDaycare+" "+idParent);
    return this.http.get(this.constantService.API_ENDPOINT + "/daycares/" + idDaycare + "/parents/" + idParent,this.loginService.getBearerToken())
      .map((response) => response.json()).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getParents(idDaycare: number): Observable<Array<Parent>> {
    console.log("getParents " +idDaycare);
      return this.http.get(this.constantService.API_ENDPOINT + "/users/role/3/daycares/" + idDaycare, this.loginService.getBearerToken())
            .map((response) => response.json()).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
        }

  createParent(idDaycare: number, parent: Parent): Observable<Array<Parent>> {

    let url: string = this.constantService.API_ENDPOINT + "/daycares/" + idDaycare + "/parents";
    let body = JSON.stringify(parent);
    return this.http.post(url, body, this.loginService.getBearerToken()
    )
      .map((response) => response.json()).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  deleteParent(idDaycare: number, idParent: number): Observable<Boolean> {
    let url: string = this.constantService.API_ENDPOINT + "/daycares/" + idDaycare + "/parents/" + idParent;
    return this.http.delete(url,this.loginService.getBearerToken())
      .map((response) => response.json()).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  errorSubscribe(error) { console.log("Error happened : "); console.log( error) }
  completed() { console.log("the subscription is completed") }
}

@Injectable()
export abstract class ParentService {
  abstract getParent(idDaycare: number, idParent: number): Observable<Parent>;
  abstract getParents(idDaycare: number): Observable<Array<Parent>>;
  abstract createParent(idDaycare: number, parent: Parent): Observable<Array<Parent>>;
  abstract deleteParent(idDaycare: number, idParent: number): Observable<Boolean>;
  abstract errorSubscribe(error);
  abstract completed();
}