import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams, Jsonp } from '@angular/http';
import { ConstantsService } from './constants-service';
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';

@Injectable()
export class LoginService {


  // Resolve HTTP using the constructor
  constructor(private http: Http, private jsonp: Jsonp, private constantService: ConstantsService) {
  }

  login(login: string, password: string): Observable<boolean> {

    let url: string = this.constantService.API_ENDPOINT + "/login";
    let body = JSON.stringify({ login: login, password: password });
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(url, body, options
    )
      .map((response) => response.json()).catch((error: any) => Observable.throw(error.json().error || 'Server error'));


  }

  logout(): Observable<boolean> {
    return this.http.post(this.constantService.API_ENDPOINT + "/logout", JSON.stringify({ password: "ss" }))
      .map((response) => response.json());
  }


}

