import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/Rx';
import {Educator, Role, User} from '../pojo/pojo';
import {LoginService} from "./login-service";
import {ConstantsService} from "./constants-service";
import {NGXLogger} from "ngx-logger";
import {ServiceImpl} from "./service";

@Injectable()
export class UserService extends ServiceImpl{
    private user:User;

    constructor(
        private http: HttpClient,
        private constantService: ConstantsService,
        private loginService: LoginService,
        protected logger: NGXLogger
    ) {super(logger);}

    set(user:User){
        this.user=user;
    }

    currentUser():User{
        return this.user;
    }

    isInRoles(roleName:string,roles:Array<Role>):boolean{
        for(let role of roles){
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
        return this.http.get<User>(url,this.loginService.getBearerToken());
    }

    getUsersByDaycareId(idDaycare:number):Observable<User[]>{
        let url: string = this.constantService.API_ENDPOINT + "/daycares/"+idDaycare+"/users/" ;
        return this.http.get<User[]>(url,this.loginService.getBearerToken());
    }

    getUsersByIdByDaycareId(idDaycare:number,idUser:number):Observable<User>{
        let url: string = this.constantService.API_ENDPOINT + "/daycares/"+idDaycare+"/users/"+idUser ;
        return this.http.get<User>(url,this.loginService.getBearerToken());
    }

    delete(idDaycare:number,idUser:number):Observable<Boolean>{
        let url: string = this.constantService.API_ENDPOINT + "/users/" + idUser;
        return new Observable<true>();
    }

    create(idDaycare: number, user: User): Observable<User> {
        let url: string = this.constantService.API_ENDPOINT + "/daycares/" + idDaycare + "/users";
        let body = JSON.stringify(user);
        return this.http.post<User>(url, body, this.loginService.getBearerToken())
            .catch((error: any) => Observable.throw(error.error || 'Server error'));
    }
}