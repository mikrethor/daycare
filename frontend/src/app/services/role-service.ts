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
        readonly http: HttpClient,
        readonly constantService: ConstantsService,
        readonly loginService: LoginService,
        readonly logger: NGXLogger
    ) {super(logger);}

    getRoles():Observable<Role[]>{
        let url: string = this.constantService.API_ENDPOINT + '/roles';
        return this.http.get<Role[]>(url,this.loginService.getBearerToken());
    }
}