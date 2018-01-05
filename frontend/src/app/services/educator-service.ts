import {Injectable} from '@angular/core';
import {ConstantsService} from './constants-service';
import {LoginService} from './login-service';
import {Educator} from '../pojo/pojo';
import {Observable} from 'rxjs/Rx';
import 'rxjs/Rx';
import {HttpClient} from "@angular/common/http";
import {NGXLogger} from "ngx-logger";
import {Service, ServiceImpl} from "./service";

@Injectable()
export class EducatorServiceImpl extends ServiceImpl implements EducatorService{

    constructor(
        private http: HttpClient,
        private constantService: ConstantsService,
        private loginService: LoginService,
        protected logger: NGXLogger

    ) {super(logger);}

    getAllByDaycareId(id: number): Observable<Educator[]> {
        this.logger.debug("getAllByDaycareId : " ,id);
        return this.http.get<Educator[]>(this.constantService.API_ENDPOINT + "/users/role/1/daycares/" + id, this.loginService.getBearerToken())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    getOneById(idDaycare: number, idEducator: number): Observable<Educator> {
        this.logger.debug("getEducator : " ,idDaycare,idEducator);
        return this.http.get(this.constantService.API_ENDPOINT + "/daycares/" + idDaycare + "/educators/" + idEducator,this.loginService.getBearerToken())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    create(idDaycare: number, educator: Educator): Observable<Educator[]> {
        let url: string = this.constantService.API_ENDPOINT + "/daycares/" + idDaycare + "/educators";
        let body = JSON.stringify(educator);
        return this.http.post<Educator>(url, body, this.loginService.getBearerToken())
            .catch((error: any) => Observable.throw(error.error || 'Server error'));
    }

    delete(idDaycare: number, idEducator: number):Observable<Boolean>{
        let url: string = this.constantService.API_ENDPOINT + "/daycares/" + idDaycare + "/educators/" + idEducator;
        this.logger.debug("delete url : ",url);
        return this.http.delete(url,this.loginService.getBearerToken())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }


}

@Injectable()
export abstract class EducatorService extends Service{
    abstract getAllByDaycareId(id: number): Observable<Educator[]>;
    abstract getOneById(idDaycare: number, idEducator: number): Observable<Educator>;
    abstract create(idDaycare: number, educator: Educator): Observable<Educator[]>;
    abstract delete(idDaycare: number, idEducator: number):Observable<Boolean>;
}