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
  private clientId="testjwtclientid";
  private clientSecret="XY7kmzoNzl100";

  constructor(
    private http: Http,
    private constantService: ConstantsService,
    private router: Router
   
   
    ) {}

  login(login: string, password: string):Observable<String>{
    return  this.http.post(this.authUrl, this.getParamsToAuthenticate(login,password), this.getBasicToken())
      .map(
        res => {
          this.myToken=res.json().access_token;
          return this.myToken;
        })    
  }

  getParamsToAuthenticate(login:string,password:string):String{
    let params = new URLSearchParams();
    params.append('username',login);
    params.append('password',password);    
    params.append('client_id',this.clientId);
    params.append('client_secret',this.clientSecret);
    params.append('grant_type','password');
    return params.toString();

  }

  getClientIdClientSecret():string{
    return 'Basic '+btoa(this.clientId+":"+this.clientSecret);
  }

  getBasicToken():RequestOptions{
    let headers = new Headers({
      'Content-type': 'application/x-www-form-urlencoded',
      'Authorization': this.getClientIdClientSecret(),
      'Allow-Control-Allow-Origin': '*' 
    });
    let options = new RequestOptions({ headers: headers });
    return options;
  }
  
  getBearerToken():RequestOptions{
    let headers = new Headers({
      'Authorization': 'Bearer '+this.myToken
    });
    let options = new RequestOptions({ headers: headers });
    return options;
  }
 
  saveToken(token){
    var expireDate = new Date().getTime() + (1000 * token.expires_in);
    Cookie.set("access_token", token.access_token, expireDate);
    this.myToken=token;
  }
 
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

