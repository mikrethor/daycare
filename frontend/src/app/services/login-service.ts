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
//   private headers = new Headers({'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
// 'Access-Control-Allow-Origin': 'Allow'});

// new Headers({'Content-type': 'application/x-www-form-urlencoded; charset=utf-8', 'Authorization': 'Basic '+btoa("XY7kmzoNzl100:secret")});

  // Resolve HTTP using the constructor
  constructor(
    private http: Http,
    // private jsonp: Jsonp,
    private constantService: ConstantsService,
    private router: Router
   
    ) { console.log('LoginService');
  }

//username=john.doe&password=jwtpass&client_id=testjwtclientid&client_secret=XY7kmzoNzl100&grant_type=password
//username=john.doe&password=jwtpass&client_id=testjwtclientid&client_secret=XY7kmzoNzl100&grant_type=password

  login(login: string, password: string){
    let params = new URLSearchParams();
    params.append('username',login);
    params.append('password',password);    
    params.append('client_id','testjwtclientid');
    params.append('client_secret','XY7kmzoNzl100');
    params.append('grant_type','password');
    let headers = new Headers({'Content-type': 'application/x-www-form-urlencoded',
     'Authorization': 'Basic dGVzdGp3dGNsaWVudGlkOlhZN2ttem9OemwxMDA=',
     'Allow-Control-Allow-Origin': '*' 
  });
    let options = new RequestOptions({ headers: headers });
     console.log('params :'+params.toString());
    this.http.post(this.authUrl, params.toString(), options)
      .map(res => {console.log("res: ");console.log(res.json());res.json();})
      .subscribe(
        data => {console.log("data:"+data);this.saveToken(data)},
        err => {console.log("err: "+err);console.log(err.json());alert('Invalid Credentials'+err)}); 
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

