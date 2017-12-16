import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams, Jsonp } from '@angular/http';
import { ConstantsService } from './constants-service';
import { LoginService } from './login-service';
import { Daycare,Role,User,Sumups,Child,Educator,Parent } from '../pojo/pojo';
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';

@Injectable()
export class DaycareServiceImpl implements DaycareService{
  private daycare:Daycare;
  // Resolve HTTP using the constructor
  constructor(private http: Http, private constantService: ConstantsService, private loginService: LoginService) {
  }

  getDaycare(id: number): Observable<Daycare> {
    return this.http.get(this.constantService.API_ENDPOINT + "/daycares/" + id, this.loginService.getBearerToken())
      .map((response) => 
        {return response.json();}
      )
      .catch(
        (error: any) => Observable.throw(error.json()|| 'Server error')
      );
  }

  getChildren(id: number): Observable<Array<Child>> {
    return this.http.get(this.constantService.API_ENDPOINT + "/daycares/" + id + "/childs")
      .map((response) => response.json()).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getEducators(id: number): Observable<Array<Educator>> {
    return this.http.get(this.constantService.API_ENDPOINT + "/daycares/" + id + "/educators")
      .map((response) => response.json()).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getEducator(idDaycare: number, idEducator: number): Observable<Educator> {
    return this.http.get(this.constantService.API_ENDPOINT + "/daycares/" + idDaycare + "/educators/" + idEducator)
      .map((response) => response.json()).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getParent(idDaycare: number, idParent: number): Observable<Parent> {
    return this.http.get(this.constantService.API_ENDPOINT + "/daycares/" + idDaycare + "/parents/" + idParent)
      .map((response) => response.json()).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getParents(idDaycare: number): Observable<Array<Parent>> {
    return this.http.get(this.constantService.API_ENDPOINT + "/daycares/" + idDaycare + "/parents/")
      .map((response) => response.json()).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getChildrenByParentId(idDaycare: number, idParent: number): Observable<Array<Parent>> {
    return this.http.get(this.constantService.API_ENDPOINT + "/daycares/" + idDaycare + "/parents/" + idParent + "/childs")
      .map((response) => response.json()).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getSumups(idDaycare: number, idChild: number): Observable<Array<Sumups>> {
    return this.http.get(this.constantService.API_ENDPOINT + "/daycares/" + idDaycare + "/childs/" + idChild + "/sumups/")
      .map((response) => response.json()).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getSumup(idDaycare: number, idChild: number, daySumup: string): Observable<Sumups> {
    return this.http.get(this.constantService.API_ENDPOINT + "/daycares/" + idDaycare + "/childs/" + idChild + "/sumups/day/" + daySumup)
      .map((response) => response.json()).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  createChild(idDaycare: number, child: Child): Observable<Array<Child>> {

    let url: string = this.constantService.API_ENDPOINT + "/daycares/" + idDaycare + "/childs";
    let body = JSON.stringify(child);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(url, body, options
    )
      .map((response) => response.json()).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  createParent(idDaycare: number, parent: Parent): Observable<Array<Parent>> {

    let url: string = this.constantService.API_ENDPOINT + "/daycares/" + idDaycare + "/parents";
    let body = JSON.stringify(parent);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(url, body, options
    )
      .map((response) => response.json()).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  deleteParent(idDaycare: number, idParent: number): Observable<Boolean> {

    let url: string = this.constantService.API_ENDPOINT + "/daycares/" + idDaycare + "/parents/" + idParent;

    let headers = new Headers({ 'Content-Type': 'application/json' });
    // let options = new RequestOptions({ headers: headers });
    return this.http.delete(url)
      .map((response) => response.json()).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  createSumup(idDaycare: number, idChild: number, sumup: Sumups): Observable<Array<Sumups>> {

    let url: string = this.constantService.API_ENDPOINT + "/daycares/" + idDaycare + "/childs/" + idChild + "/sumups";
    let body = JSON.stringify(sumup);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(url, body, options
    )
      .map((response) => response.json()).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  createEducator(idDaycare: number, educator: Educator): Observable<Array<Educator>> {

    let url: string = this.constantService.API_ENDPOINT + "/daycares/" + idDaycare + "/educators";
    let body = JSON.stringify(educator);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(url, body, options
    )
      .map((response) => response.json()).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  deleteEducator(idDaycare: number, idEducator: number): Observable<Boolean> {

    let url: string = this.constantService.API_ENDPOINT + "/daycares/" + idDaycare + "/educators/" + idEducator;

    let headers = new Headers({ 'Content-Type': 'application/json' });
    // let options = new RequestOptions({ headers: headers });
    return this.http.delete(url)
      .map((response) => response.json()).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  deleteChild(idDaycare: number, idChild: number): Observable<Boolean> {

    let url: string = this.constantService.API_ENDPOINT + "/daycares/" + idDaycare + "/childs/" + idChild;

    let headers = new Headers({ 'Content-Type': 'application/json' });
    // let options = new RequestOptions({ headers: headers });
    return this.http.delete(url)
      .map((response) => response.json()).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getUser(username:String):Observable<User>{
    let url: string = this.constantService.API_ENDPOINT + "/users/" + username;
    return this.http.get(url,this.loginService.getBearerToken())
    .map((response) => response.json()).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  errorSubscribe(error) { console.log("Error happened :" + error) }
  completed() { console.log("the subscription is completed") }
}

@Injectable()
export abstract class DaycareService {
  abstract getDaycare(id: number) : Observable<Daycare>;
  abstract getChildren(id: number): Observable<Array<Child>>;
  abstract getEducators(id: number): Observable<Array<Educator>>;
  abstract getEducator(idDaycare: number, idEducator: number): Observable<Educator>;
  abstract getParent(idDaycare: number, idParent: number): Observable<Parent>;
  abstract getParents(idDaycare: number): Observable<Array<Parent>>;
  abstract getChildrenByParentId(idDaycare: number, idParent: number): Observable<Array<Child>>;
  abstract getSumups(idDaycare: number, idChild: number): Observable<Array<Sumups>>;
  abstract getSumup(idDaycare: number, idChild: number, daySumup: string): Observable<Sumups>;
  abstract createChild(idDaycare: number, child: Child): Observable<Array<Child>>
  abstract createParent(idDaycare: number, parent: Parent): Observable<Array<Parent>>;
  abstract deleteParent(idDaycare: number, idParent: number): Observable<Boolean>;
  abstract createSumup(idDaycare: number, idChild: number, sumup: Sumups): Observable<Array<Sumups>>;
  abstract createEducator(idDaycare: number, educator: Educator): Observable<Array<Educator>>;
  abstract deleteEducator(idDaycare: number, idEducator: number): Observable<Boolean>;
  abstract deleteChild(idDaycare: number, idChild: number): Observable<Boolean>;
  abstract getUser(username:String): Observable<User>;
  abstract errorSubscribe(error);
  abstract completed();
}