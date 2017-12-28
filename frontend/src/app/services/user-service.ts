import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/Rx';
import {Role, User} from '../pojo/pojo';
import {LoginService} from "./login-service";
import {ConstantsService} from "./constants-service";

@Injectable()
export class UserService {
    private user:User;
    
    constructor(
        private http: HttpClient,
        private constantService: ConstantsService,
        private loginService: LoginService
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

    getUser(username:String):Observable<User>{
        let url: string = this.constantService.API_ENDPOINT + "/users/" + username;
        return this.http.get<User>(url,this.loginService.getBearerToken2());
            // .map((response) => response.json()).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }


    errorSubscribe(error) { console.log("Error happened : "); console.log( error) }
    completed() { console.log("the subscription is completed") }
}