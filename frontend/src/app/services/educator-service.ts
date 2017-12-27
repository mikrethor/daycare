import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {ConstantsService} from './constants-service';
import {LoginService} from './login-service';
import {Educator} from '../pojo/pojo';
import {Observable} from 'rxjs/Rx';
import 'rxjs/Rx';

@Injectable()
export class EducatorServiceImpl implements EducatorService{

  constructor(
      private http: Http,
      private constantService: ConstantsService,
      private loginService: LoginService
  ) {}

    getAllByDaycareId(id: number): Observable<Array<Educator>> {
    console.log("getEducators " +id);
    return this.http.get(this.constantService.API_ENDPOINT + "/users/role/1/daycares/" + id, this.loginService.getBearerToken())

      .map((response) => response.json()).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

    getOneById(idDaycare: number, idEducator: number): Observable<Educator> {
    console.log("getEducator " +idDaycare+" "+idEducator);
    return this.http.get(this.constantService.API_ENDPOINT + "/daycares/" + idDaycare + "/educators/" + idEducator,this.loginService.getBearerToken())
      .map((response) => response.json()).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  create(idDaycare: number, educator: Educator): Observable<Array<Educator>> {
    let url: string = this.constantService.API_ENDPOINT + "/daycares/" + idDaycare + "/educators";
    let body = JSON.stringify(educator);
    return this.http.post(url, body, this.loginService.getBearerToken())
      .map((response) => response.json()).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  delete(idDaycare: number, idEducator: number):Observable<Boolean>{
    let url: string = this.constantService.API_ENDPOINT + "/daycares/" + idDaycare + "/educators/" + idEducator;
    console.log("delete url "+url);
    return this.http.delete(url,this.loginService.getBearerToken()).
    map((response) => response.json()).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  errorSubscribe(error) { console.log("Error happened : "); console.log( error) }
  completed() { console.log("the subscription is completed") }
}

@Injectable()
export abstract class EducatorService {
  abstract getAllByDaycareId(id: number): Observable<Array<Educator>>;
  abstract getOneById(idDaycare: number, idEducator: number): Observable<Educator>;
  abstract create(idDaycare: number, educator: Educator): Observable<Array<Educator>>;
  abstract delete(idDaycare: number, idEducator: number):Observable<Boolean>;
  abstract errorSubscribe(error);
  abstract completed();
}