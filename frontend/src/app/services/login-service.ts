import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams, Jsonp } from '@angular/http';
import { Cookie } from 'ng2-cookies';
import { ConstantsService } from './constants-service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';

@Injectable()
export class LoginService {
  private authUrl = this.constantService.API_ENDPOINT + "/oauth/token";
  private headers = new Headers({'Content-Type': 'application/json',

  'Access-Control-Allow-Origin': '*'

});

  // Resolve HTTP using the constructor
  constructor(
    private http: Http,
    // private jsonp: Jsonp,
    private constantService: ConstantsService,
    private router: Router
   
    ) { console.log('LoginService');
  }

  // login(login: string, password: string): Observable<boolean> {

  //   let url: string = this.constantService.API_ENDPOINT + "/login";
  //   let body = JSON.stringify({ login: login, password: password });
  //   let headers = new Headers({ 'Content-Type': 'application/json' });
  //   let options = new RequestOptions({ headers: headers });
  //   return this.http.post(url, body, options
  //   )
  //     .map((response) => response.json()).catch((error: any) => Observable.throw(error.json().error || 'Server error'));


  // }

  // logout(): Observable<boolean> {
  //   return this.http.post(this.constantService.API_ENDPOINT + "/logout", JSON.stringify({ password: "ss" }))
  //     .map((response) => response.json());
  // }

  login(login: string, password: string){
    let params = new URLSearchParams();
    params.append('username',login);
    params.append('password',password);    
    params.append('grant_type','password');
    params.append('client_id','fooClientIdPassword');
    // let headers = new Headers({'Content-type': 'application/x-www-form-urlencoded; charset=utf-8', 'Authorization': 'Basic '+btoa("fooClientIdPassword:secret")});
    let options = new RequestOptions({ headers: this.headers });
     
    this.http.post(this.authUrl, params.toString(), options)
      .map(res => res.json())
      .subscribe(
        data => this.saveToken(data),
        err => {alert('Invalid Credentials')}); 
  }
 
  saveToken(token){
    var expireDate = new Date().getTime() + (1000 * token.expires_in);
    Cookie.set("access_token", token.access_token, expireDate);
    this.router.navigate(['/']);
  }
 
//   getResource(resourceUrl) : Observable<MyToken>{
//     var headers = new Headers({'Content-type': 'application/x-www-form-urlencoded; charset=utf-8', 'Authorization': 'Bearer '+Cookie.get('access_token')});
//     var options = new RequestOptions({ headers: headers });
//     return this.http.get(resourceUrl, options)
//                    .map((res:Response) => res.json())
//                    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
//   }
 
//   checkCredentials(){
//     // if (!Cookie.check('access_token')){
//     if (Cookie.get('access_token').length != 0){
//       this.router.navigate(['/login']);
//     }
//   } 
 
//   logout() {
//     Cookie.delete('access_token');
//     this.router.navigate(['/login']);
//   }



// }

// export class MyToken {
//   constructor(
//     public id: number,
//     public name: string) { }
} 

