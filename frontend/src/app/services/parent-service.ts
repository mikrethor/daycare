import {Injectable} from '@angular/core';
import {ConstantsService} from './constants-service';
import {LoginService} from './login-service';
import {Parent} from '../pojo/pojo';
import {Observable} from 'rxjs/Rx';
import 'rxjs/Rx';
import {HttpClient} from "@angular/common/http";
import {Service, ServiceImpl} from "./service";
import {NGXLogger} from "ngx-logger";

@Injectable()
export class ParentServiceImpl extends ServiceImpl implements ParentService{

    constructor(
        private http: HttpClient,
        private constantService: ConstantsService,
        private loginService: LoginService,
        protected logger: NGXLogger
    ) {super(logger);}


    getOneById(idDaycare: number, idParent: number): Observable<Parent> {
        this.logger.debug("getEducator : " ,idDaycare,idParent);
        return this.http.get(this.constantService.API_ENDPOINT + "/daycares/" + idDaycare + "/parents/" + idParent,this.loginService.getBearerToken())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    getAllByDaycareId(idDaycare: number): Observable<Parent[]> {
        this.logger.debug("getParents : " ,idDaycare);
        return this.http.get(this.constantService.API_ENDPOINT + "/users/role/3/daycares/" + idDaycare, this.loginService.getBearerToken())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    create(idDaycare: number, parent: Parent): Observable<Parent[]> {

        let url: string = this.constantService.API_ENDPOINT + "/daycares/" + idDaycare + "/parents";
        let body = JSON.stringify(parent);
        return this.http.post(url, body, this.loginService.getBearerToken()
        )
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    delete(idDaycare: number, idParent: number): Observable<Boolean> {
        let url: string = this.constantService.API_ENDPOINT + "/daycares/" + idDaycare + "/parents/" + idParent;
        return this.http.delete(url,this.loginService.getBearerToken())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
}

@Injectable()
export abstract class ParentService extends Service{
    abstract getOneById(idDaycare: number, idParent: number): Observable<Parent>;
    abstract getAllByDaycareId(idDaycare: number): Observable<Parent[]>;
    abstract create(idDaycare: number, parent: Parent): Observable<Parent[]>;
    abstract delete(idDaycare: number, idParent: number): Observable<Boolean>;
}