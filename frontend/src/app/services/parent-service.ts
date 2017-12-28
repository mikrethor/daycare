import {Injectable} from '@angular/core';
import {ConstantsService} from './constants-service';
import {LoginService} from './login-service';
import {Parent} from '../pojo/pojo';
import {Observable} from 'rxjs/Rx';
import 'rxjs/Rx';
import {HttpClient} from "@angular/common/http";

@Injectable()
export class ParentServiceImpl implements ParentService{

    constructor(
        private http: HttpClient,
        private constantService: ConstantsService,
        private loginService: LoginService
    ) {}


    getOneById(idDaycare: number, idParent: number): Observable<Parent> {
        console.log("getEducator " +idDaycare+" "+idParent);
        return this.http.get(this.constantService.API_ENDPOINT + "/daycares/" + idDaycare + "/parents/" + idParent,this.loginService.getBearerToken2())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    getAllByDaycareId(idDaycare: number): Observable<Parent[]> {
        console.log("getParents " +idDaycare);
        return this.http.get(this.constantService.API_ENDPOINT + "/users/role/3/daycares/" + idDaycare, this.loginService.getBearerToken2())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    create(idDaycare: number, parent: Parent): Observable<Parent[]> {

        let url: string = this.constantService.API_ENDPOINT + "/daycares/" + idDaycare + "/parents";
        let body = JSON.stringify(parent);
        return this.http.post(url, body, this.loginService.getBearerToken2()
        )
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    delete(idDaycare: number, idParent: number): Observable<Boolean> {
        let url: string = this.constantService.API_ENDPOINT + "/daycares/" + idDaycare + "/parents/" + idParent;
        return this.http.delete(url,this.loginService.getBearerToken2())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    errorSubscribe(error) { console.log("Error happened : "); console.log( error) }
    completed() { console.log("the subscription is completed") }
}

@Injectable()
export abstract class ParentService {
    abstract getOneById(idDaycare: number, idParent: number): Observable<Parent>;
    abstract getAllByDaycareId(idDaycare: number): Observable<Parent[]>;
    abstract create(idDaycare: number, parent: Parent): Observable<Parent[]>;
    abstract delete(idDaycare: number, idParent: number): Observable<Boolean>;
    abstract errorSubscribe(error);
    abstract completed();
}