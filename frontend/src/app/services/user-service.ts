import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams, Jsonp } from '@angular/http';
import { Cookie } from 'ng2-cookies';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';
import { User,Role} from '../pojo/pojo';

@Injectable()
export class UserService {
    private user:User;
    
    constructor(
    ) {}

    set(user:User){
        this.user=user;
    }

    currentUser():User{
        return this.user;
    }

    isInRoles(roleName:string,roles:Array<Role>):boolean{
        for(let role of roles){
            console.log(role.name);
            if(role.name==roleName){
                return true;
            }
        }
        return false;
    }

    isRole(roleName:string):boolean{
        return this.isInRoles(roleName,this.user.roles);
    }

    isEducator():boolean{
        return this.isRole("EDUCATOR");
    }

    isAdmin():boolean{
        return this.isRole("ADMIN");
    }

    isParent():boolean{
        return this.isRole("PARENT");
    }
}