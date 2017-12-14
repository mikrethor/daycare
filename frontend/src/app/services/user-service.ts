import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams, Jsonp } from '@angular/http';
import { Cookie } from 'ng2-cookies';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';
import { User} from '../pojo/pojo';

@Injectable()
export class UserService {
    private user:User;
    
    constructor(
   
    ) {}

    currentUser():User{
        return this.user;
    }
}