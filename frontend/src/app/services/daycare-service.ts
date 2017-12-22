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
    console.log("getDaycare " +id);
    var endpoint = this.constantService.API_ENDPOINT;
    var url = endpoint+"/daycares/"+id;

 
    return this.http.get( url, this.loginService.getBearerToken())
      .map((response) => 
        {return response.json();}
      )
      .catch(
        (error: any) => Observable.throw(error.json()|| 'Server error')
      );
  }
//parent 3 
//admin 2
  getChildren(id: number): Observable<Array<Child>> {
    console.log("getChildren " +id);
    return this.http.get(this.constantService.API_ENDPOINT + "/daycares/" + id + "/childs",this.loginService.getBearerToken())
      .map((response) => response.json()).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getEducators(id: number): Observable<Array<Educator>> {
    console.log("getEducators " +id);
    return this.http.get(this.constantService.API_ENDPOINT + "/users/role/1/daycares/" + id, this.loginService.getBearerToken())

      .map((response) => response.json()).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getEducator(idDaycare: number, idEducator: number): Observable<Educator> {
    console.log("getEducator " +idDaycare+" "+idEducator);
    return this.http.get(this.constantService.API_ENDPOINT + "/daycares/" + idDaycare + "/educators/" + idEducator,this.loginService.getBearerToken())
      .map((response) => response.json()).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getParent(idDaycare: number, idParent: number): Observable<Parent> {
    console.log("getEducator " +idDaycare+" "+idParent)
    return this.http.get(this.constantService.API_ENDPOINT + "/daycares/" + idDaycare + "/parents/" + idParent,this.loginService.getBearerToken())
      .map((response) => response.json()).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getParents(idDaycare: number): Observable<Array<Parent>> {
    console.log("getParents " +idDaycare);
      return this.http.get(this.constantService.API_ENDPOINT + "/users/role/3/daycares/" + idDaycare, this.loginService.getBearerToken())
      
            .map((response) => response.json()).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
        }

  getChildrenByParentId(idDaycare: number, idParent: number): Observable<Array<Parent>> {
    console.log("getChildrenByParentId " +idDaycare+" "+idParent);
    return this.http.get(this.constantService.API_ENDPOINT + "/daycares/" + idDaycare + "/parents/" + idParent + "/childs",this.loginService.getBearerToken())
      .map((response) => response.json()).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getSumups(idDaycare: number, idChild: number): Observable<Array<Sumups>> {
    console.log("getSumups " +idDaycare+" "+idChild);
    return this.http.get(this.constantService.API_ENDPOINT + "/daycares/" + idDaycare + "/childs/" + idChild + "/sumups/",this.loginService.getBearerToken())
      .map((response) => response.json()).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getSumup(idDaycare: number, idChild: number, daySumup: string): Observable<Sumups> {
    console.log("getSumup " +idDaycare+" "+idChild+" "+daySumup);
    return this.http.get(this.constantService.API_ENDPOINT + "/daycares/" + idDaycare + "/childs/" + idChild + "/sumups/day/" + daySumup,this.loginService.getBearerToken())
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

  errorSubscribe(error) { console.log("Error happened : "); console.log( error) }
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