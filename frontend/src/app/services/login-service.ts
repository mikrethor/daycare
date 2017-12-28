import {Injectable} from '@angular/core';
import {Headers, RequestOptions} from '@angular/http';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {JwtToken} from '../pojo/pojo';
import {Cookie} from 'ng2-cookies';
import {ConstantsService} from './constants-service';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Rx';
import 'rxjs/Rx';

@Injectable()
export class LoginService {
    private authUrl = this.constantService.API_ENDPOINT + "/oauth/token";
    private myToken : String;
    private clientId="testjwtclientid";
    private clientSecret="XY7kmzoNzl100";

    constructor(
        private http: HttpClient,
        private constantService: ConstantsService,
        private router: Router
    ) {}

    getBasicAuthorization():string{
        return 'Basic '+btoa(this.clientId+":"+this.clientSecret);
    }

    getBearerAuthorization():string{
        return 'Bearer '+this.myToken
    }

    //TODO when other services will all use httpClient
    getBearerToken():RequestOptions{
        let headers = new Headers({
            // 'Content-Type': 'application/json',
            'Authorization': this.getBearerAuthorization(),
            // 'Allow-Control-Allow-Origin': '*'
        });
        let options = new RequestOptions({ headers: headers });
        return options;
    }

    //TODO when other services will all use httpClient
    getBearerToken2():{headers:HttpHeaders,withCredentials:boolean}{
        let headers = new HttpHeaders()
            .set('Authorization', this.getBearerAuthorization());

        const httpOptions = {
            headers: headers,
            withCredentials: false
        };
        return httpOptions;
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
        this.myToken="";
        this.router.navigate(['/daycare/login']);
    }

    login(login: string, password: string):Observable<JwtToken>{
        const httpOptions = {
            headers: this.getBasicToken(),
            params: this.getParamsToAuthenticate(login,password),
            withCredentials: true
        };

        return  this.http.post<JwtToken>(
            this.authUrl,
            new FormData(),
            httpOptions
        );
    }

    getBasicToken(): HttpHeaders {
        let headers = new HttpHeaders()
            .set('Content-type', 'application/x-www-form-urlencoded')
            .set('Authorization', this.getBasicAuthorization())
            .set('Allow-Control-Allow-Origin', '*');
        return  headers ;
    }

    getParamsToAuthenticate(login:string,password:string): HttpParams{
        let params = new HttpParams()
            .set('username',login)
            .set('password',password)
            .set('grant_type','password');
        return params;
    }
} 

