import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/Rx';
import {Role} from '../pojo/pojo';
import {LoginService} from "./login-service";
import {ConstantsService} from "./constants-service";
import {Observable} from "rxjs/Observable";
import {ServiceImpl} from "./service";
import {NGXLogger} from "ngx-logger";

@Injectable()
export class RoleService extends ServiceImpl{

    constructor(
        private http: HttpClient,
        private constantService: ConstantsService,
        private loginService: LoginService,
        protected logger: NGXLogger
    ) {super(logger);}

    getRoles():Observable<Role[]>{
        let url: string = this.constantService.API_ENDPOINT + '/roles';
        return this.http.get<Role[]>(url,this.loginService.getBearerToken());
    }
}