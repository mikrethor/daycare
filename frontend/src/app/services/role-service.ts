import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/Rx';
import {Role} from '../pojo/pojo';
import {LoginService} from "./login-service";
import {ConstantsService} from "./constants-service";
import {Observable} from "rxjs/Observable";

@Injectable()
export class RoleService {

    constructor(
        private http: HttpClient,
        private constantService: ConstantsService,
        private loginService: LoginService
    ) {}

    getRoles():Observable<Role[]>{
        let url: string = this.constantService.API_ENDPOINT + '/roles';
        return this.http.get<Role[]>(url,this.loginService.getBearerToken());
    }

    errorSubscribe(error) { console.log("Error happened : "); console.log( error) }
    completed() { console.log("the subscription is completed") }
}