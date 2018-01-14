import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {JwtToken} from '../pojo/pojo';
import {ConstantsService} from './constants-service';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Rx';
import 'rxjs/Rx';
import {LocalStorage} from "../annotations/local-storage";
import {NGXLogger} from "ngx-logger";

@Injectable()
export class LoginService {
    private authUrl = this.constantService.API_ENDPOINT + "/oauth/token";
    private clientId="testjwtclientid";
    private clientSecret="XY7kmzoNzl100";


    @LocalStorage
    private myToken:string;

    @LocalStorage
    private myUsername:string;

    constructor(
        private http: HttpClient,
        private constantService: ConstantsService,
        private router: Router,
        private logger: NGXLogger
    ) {}

    getBasicAuthorization():string{
        return 'Basic '+btoa(this.clientId+":"+this.clientSecret);
    }

    getBearerAuthorization():string{
        return 'Bearer '+this.myToken;
    }

    getBearerToken():{headers:HttpHeaders,withCredentials:boolean}{
        let headers = new HttpHeaders()
            .set('Authorization', this.getBearerAuthorization())
            .set('Access-Control-Allow-Origin', '*' )
            .set('Content-Type', 'application/json; charset=utf8');
        const httpOptions = {
            headers: headers,
            withCredentials: false
        };
        return httpOptions;
    }

    saveToken(token){
        this.myToken=token;
    }

    checkCredentials(){
        if (this.myToken.length != 0){
            this.router.navigate(['/login']);
        }
    }

    logout() {
        this.myToken="";
        this.router.navigate(['/login']);
        this.logger.info('Logout successful with',this.myUsername);
    }

    login(login: string, password: string):Observable<JwtToken>{
        this.myUsername=login;
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

    username(){
        return this.myUsername;
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

