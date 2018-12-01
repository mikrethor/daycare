import {Injectable} from '@angular/core';
import {ConstantsService} from './constants-service';
import {LoginService} from './login-service';
import {Child} from '../pojo/pojo';
import {Observable} from 'rxjs/Rx';
import 'rxjs/Rx';
import {HttpClient} from "@angular/common/http";
import {Service, ServiceImpl} from "./service";
import {NGXLogger} from "ngx-logger";

@Injectable()
export class ChildServiceImpl extends ServiceImpl implements ChildService{

    constructor(
        readonly http: HttpClient,
        readonly constantService: ConstantsService,
        readonly loginService: LoginService,
        readonly logger: NGXLogger
    ) {super(logger);}

    getAllByDaycareId(id: number): Observable<Child[]> {
        this.logger.debug("getChildren : " ,id);
        return this.http.get<Child[]>(this.constantService.API_ENDPOINT + "/daycares/" + id + "/childs/",this.loginService.getBearerToken())
            .catch((error: any) =>
                {
                    return  Observable.throw(error.error || 'Server error')}
            );
    }

    getAllByParentId(idDaycare: number, idParent: number): Observable<Array<Child>> {
        this.logger.debug("getChildrenByParentId : " ,idDaycare,idParent);
        return this.http.get<Child[]>(this.constantService.API_ENDPOINT + "/daycares/" + idDaycare + "/parents/" + idParent + "/childs",this.loginService.getBearerToken())
            .catch((error: any) => Observable.throw(error.error || 'Server error'));
    }

    getOneByDaycareId(idDaycare: number,id: number): Observable<Child> {
        this.logger.debug("getChildren : " ,id);
        return this.http.get<Child>(this.constantService.API_ENDPOINT + "/daycares/" + idDaycare + "/childs/"+id,this.loginService.getBearerToken())
            .catch((error: any) =>
                {
                    return  Observable.throw(error.error || 'Server error')}
            );
    }

    create(idDaycare: number, child: Child): Observable<Child> {
        let url: string = this.constantService.API_ENDPOINT + "/daycares/" + idDaycare + "/childs";
        let body = JSON.stringify(child);
        return this.http.post<Child>(url, body, this.loginService.getBearerToken())
            .catch((error: any) => {
                this.logger.error(error);
                return Observable.throw(error.error || 'Server error');
            });
    }

    delete(idDaycare: number, idChild: number): Observable<Boolean> {
        let url: string = this.constantService.API_ENDPOINT + "/daycares/" + idDaycare + "/childs/" + idChild;
        return this.http.delete<Boolean>(url, this.loginService.getBearerToken())
            .catch((error: any) =>  Observable.throw(error.error || 'Server error'));
    }


}

@Injectable()
export abstract class ChildService extends Service{
    abstract getOneByDaycareId(idDaycare: number,id: number): Observable<Child>;
    abstract getAllByDaycareId(id: number): Observable<Child[]>;
    abstract getAllByParentId(idDaycare: number, idParent: number): Observable<Array<Child>>;
    abstract create(idDaycare: number, child: Child): Observable<Child>
    abstract delete(idDaycare: number, idChild: number): Observable<Boolean>;

}