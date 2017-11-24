import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams, Jsonp } from '@angular/http';
import { ConstantsService } from './constants-service';
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';

@Injectable()
export class DaycareService implements IDaycareService{
  // Resolve HTTP using the constructor
  constructor(private http: Http, private jsonp: Jsonp, private constantService: ConstantsService) {
  }

  getDaycare(id: number): Observable<Array<Daycare>> {
    return this.http.get(this.constantService.API_ENDPOINT + "/daycares/" + id)
      .map((response) => response.json()).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getChildren(id: number): Observable<Array<Child>> {
    return this.http.get(this.constantService.API_ENDPOINT + "/daycares/" + id + "/childs")
      .map((response) => response.json()).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getEducators(id: number): Observable<Array<Educator>> {
    return this.http.get(this.constantService.API_ENDPOINT + "/daycares/" + id + "/educators")
      .map((response) => response.json()).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getEducator(idDaycare: number, idEducator: number): Observable<Array<Educator>> {
    return this.http.get(this.constantService.API_ENDPOINT + "/daycares/" + idDaycare + "/educators/" + idEducator)
      .map((response) => response.json()).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getParent(idDaycare: number, idParent: number): Observable<Array<Parent>> {
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

  getSumup(idDaycare: number, idChild: number, daySumup: string): Observable<Array<Sumups>> {
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

  deleteParent(idDaycare: number, idParent: number): Observable<Array<String>> {

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

  deleteEducator(idDaycare: number, idEducator: number): Observable<Array<String>> {

    let url: string = this.constantService.API_ENDPOINT + "/daycares/" + idDaycare + "/educators/" + idEducator;

    let headers = new Headers({ 'Content-Type': 'application/json' });
    // let options = new RequestOptions({ headers: headers });
    return this.http.delete(url)
      .map((response) => response.json()).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  deleteChild(idDaycare: number, idChild: number): Observable<Array<String>> {

    let url: string = this.constantService.API_ENDPOINT + "/daycares/" + idDaycare + "/childs/" + idChild;

    let headers = new Headers({ 'Content-Type': 'application/json' });
    // let options = new RequestOptions({ headers: headers });
    return this.http.delete(url)
      .map((response) => response.json()).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  errorSubscribe(error) { console.log("Error happened :" + error) }
  completed() { console.log("the subscription is completed") }



}




export class Daycare {
  constructor(
    public id: number,
    public name: string
  ) { }


}

export class Child {
  constructor(
    public id: number,
    public firstName: string,
    public lastName: string,
    public daycare: number
  ) { }


}

export class Educator {
  constructor(
    public id: number,
    public firstName: string,
    public lastName: string,
    public daycare: number
  ) { }
}

export class Parent {
  constructor(
    public id: number,
    public firstName: string,
    public lastName: string,
    public daycare: number
  ) { }
}

export class Sumups {
  constructor(
    public id: number,
    public child: number,
    public mood: number,
    public sleep: number,
    public appetite: number,
    public comment: string,
    public educator: number,
    public day: number
  ) { }


}

export class User {
  constructor(
    public id: number,
    public parent: number,
    public educator: number,
    public admin: number,
    public login: string,
    public idDaycare: number
  ) { }


}

export interface IDaycareService {
  getDaycare(id: number): Observable<Array<Daycare>>;
  getChildren(id: number): Observable<Array<Child>>;
  getEducators(id: number): Observable<Array<Educator>>;
  getEducator(idDaycare: number, idEducator: number): Observable<Array<Educator>>;
  getParent(idDaycare: number, idParent: number): Observable<Array<Parent>>;
  getParents(idDaycare: number): Observable<Array<Parent>>;
  getChildrenByParentId(idDaycare: number, idParent: number): Observable<Array<Child>>;
  getSumups(idDaycare: number, idChild: number): Observable<Array<Sumups>>;
  getSumup(idDaycare: number, idChild: number, daySumup: string): Observable<Array<Sumups>>;
  createChild(idDaycare: number, child: Child): Observable<Array<Child>>
  createParent(idDaycare: number, parent: Parent): Observable<Array<Parent>>;
  deleteParent(idDaycare: number, idParent: number): Observable<Array<String>>;
  createSumup(idDaycare: number, idChild: number, sumup: Sumups): Observable<Array<Sumups>>;
  createEducator(idDaycare: number, educator: Educator): Observable<Array<Educator>>;
  deleteEducator(idDaycare: number, idEducator: number): Observable<Array<String>>;
  deleteChild(idDaycare: number, idChild: number): Observable<Array<String>>;
}