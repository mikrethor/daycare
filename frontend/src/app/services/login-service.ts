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
  private myToken : String;

  constructor(
    private http: Http,
    private constantService: ConstantsService,
    private router: Router
   
   
    ) { console.log('LoginService');
  }

  token():String{
    return this.myToken;
  }

  login(login: string, password: string){
    let params = new URLSearchParams();
    params.append('username',login);
    params.append('password',password);    
    params.append('client_id','testjwtclientid');
    params.append('client_secret','XY7kmzoNzl100');
    params.append('grant_type','password');
    let headers = new Headers({
      'Content-type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic dGVzdGp3dGNsaWVudGlkOlhZN2ttem9OemwxMDA=',
      'Allow-Control-Allow-Origin': '*' 
    });
    let options = new RequestOptions({ headers: headers });
    this.http.post(this.authUrl, params.toString(), options)
      .map(
        res => {
          this.myToken=res.json().access_token;
          return this.myToken;
        })
      .subscribe(
        data => {
          this.saveToken(data);
        },
        err => {
          alert('Invalid Credentials :'+err)
        });     
  }
 
  saveToken(token){
    var expireDate = new Date().getTime() + (1000 * token.expires_in);
    Cookie.set("access_token", token.access_token, expireDate);
    this.myToken=token;
  }
 
//   getResource(resourceUrl) : Observable<MyToken>{
//     var headers = new Headers({'Content-type': 'application/x-www-form-urlencoded; charset=utf-8', 'Authorization': 'Bearer '+Cookie.get('access_token')});
//     var options = new RequestOptions({ headers: headers });
//     return this.http.get(resourceUrl, options)
//                    .map((res:Response) => res.json())
//                    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
//   }
 
  checkCredentials(){
    // if (!Cookie.check('access_token')){
    if (Cookie.get('access_token').length != 0){
      this.router.navigate(['/login']);
    }
  } 
 
  logout() {
    Cookie.delete('access_token');
    this.router.navigate(['/login']);
  }
} 

