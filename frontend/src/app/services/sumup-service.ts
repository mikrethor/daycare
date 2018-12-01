import {Injectable} from '@angular/core';
import {ConstantsService} from './constants-service';
import {LoginService} from './login-service';
import {Sumups} from '../pojo/pojo';
import {Observable} from 'rxjs/Rx';
import 'rxjs/Rx';
import {HttpClient} from "@angular/common/http";
import {Service, ServiceImpl} from "./service";
import {NGXLogger} from "ngx-logger";

@Injectable()
export class SumupServiceImpl extends ServiceImpl implements SumupService{

    constructor(
        readonly http: HttpClient,
        readonly constantService: ConstantsService,
        readonly loginService: LoginService,
        readonly logger: NGXLogger
    ) {super(logger);}

    getAllByChildId(idDaycare: number, idChild: number): Observable<Sumups[]> {
        this.logger.debug("getSumups : " ,idDaycare,idChild);
        return this.http.get<Sumups[]>(this.constantService.API_ENDPOINT + "/daycares/" + idDaycare + "/childs/" + idChild + "/sumups/", this.loginService.getBearerToken())
            .catch((error: any) => Observable.throw(error.error || 'Server error'));
    }

    getOneByChildIdAndDay(idDaycare: number, idChild: number, daySumup: string): Observable<Sumups> {
        this.logger.debug("getSumup : " ,idDaycare,idChild,daySumup);
        return this.http.get<Sumups>(this.constantService.API_ENDPOINT + "/daycares/" + idDaycare + "/childs/" + idChild + "/sumups/day/" + daySumup, this.loginService.getBearerToken())
            .catch((error: any) => Observable.throw(error.error || 'Server error'));
    }

    create(idDaycare: number, idChild: number, sumup: Sumups): Observable<Sumups> {
        this.logger.debug("create : " ,idDaycare,idChild,sumup);
        let url: string = this.constantService.API_ENDPOINT + "/daycares/" + idDaycare + "/childs/" + idChild + "/sumups";
        let body = JSON.stringify(sumup);
        return this.http.post<Sumups>(url, body, this.loginService.getBearerToken())
            .catch((error: any) => Observable.throw(error.error || 'Server error'));
    }
}

@Injectable()
export abstract class SumupService extends Service{
    abstract getAllByChildId(idDaycare: number, idChild: number): Observable<Sumups[]>;
    abstract getOneByChildIdAndDay(idDaycare: number, idChild: number, daySumup: string): Observable<Sumups>;

    abstract create(idDaycare: number, idChild: number, sumup: Sumups): Observable<Sumups>;
}