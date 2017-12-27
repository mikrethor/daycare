import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ConstantsService } from './constants-service';
import { LoginService } from './login-service';
import { Daycare,Role,User,Sumups,Child,Educator,Parent } from '../pojo/pojo';
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';

@Injectable()
export class ChildServiceImpl implements ChildService{

  constructor(
      private http: Http,
      private constantService: ConstantsService,
      private loginService: LoginService
  ) {}

  getAllByDaycareId(id: number): Observable<Array<Child>> {
    console.log("getChildren " +id);
    return this.http.get(this.constantService.API_ENDPOINT + "/daycares/" + id + "/childs/",this.loginService.getBearerToken())
      .map((response) => {
       return response.json();
      }).catch((error: any) => 
    {
      return  Observable.throw(error.json().error || 'Server error')}
    );
  }

  getAllByParentId(idDaycare: number, idParent: number): Observable<Array<Child>> {
    console.log("getChildrenByParentId " +idDaycare+" "+idParent);
    return this.http.get(this.constantService.API_ENDPOINT + "/daycares/" + idDaycare + "/parents/" + idParent + "/childs",this.loginService.getBearerToken())
      .map((response) => response.json()).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  create(idDaycare: number, child: Child): Observable<Array<Child>> {

    let url: string = this.constantService.API_ENDPOINT + "/daycares/" + idDaycare + "/childs";
    let body = JSON.stringify(child);
    return this.http.post(url, body, this.loginService.getBearerToken()
    )
      .map((response) => response.json()).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  delete(idDaycare: number, idChild: number): Observable<Boolean> {
    let url: string = this.constantService.API_ENDPOINT + "/daycares/" + idDaycare + "/childs/" + idChild;
    return this.http.delete(url)
      .map((response) => response.json()).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  errorSubscribe(error) { console.log("Error happened : "); console.log( error) }
  completed() { console.log("the subscription is completed") }
}

@Injectable()
export abstract class ChildService {
  abstract getAllByDaycareId(id: number): Observable<Array<Child>>;
  abstract getAllByParentId(idDaycare: number, idParent: number): Observable<Array<Child>>;
  abstract create(idDaycare: number, child: Child): Observable<Array<Child>>
  abstract delete(idDaycare: number, idChild: number): Observable<Boolean>;
  abstract errorSubscribe(error);
  abstract completed();
}