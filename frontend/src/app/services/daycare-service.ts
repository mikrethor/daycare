import {Injectable} from '@angular/core';
import {ConstantsService} from './constants-service';
import {LoginService} from './login-service';
import {HttpClient} from '@angular/common/http';
import {Daycare} from '../pojo/pojo';
import {Observable} from 'rxjs/Rx';
import 'rxjs/Rx';

@Injectable()
export class DaycareServiceImpl implements DaycareService{
    private daycare:Daycare;
    constructor(
        private http: HttpClient,
        private constantService: ConstantsService,
        private loginService: LoginService
    ) {}

    getDaycare(id: number): Observable<Daycare> {
        console.log("getDaycare " +id);
        let endpoint = this.constantService.API_ENDPOINT;
        let url = endpoint+"/daycares/"+id;

        return this.http.get<Daycare>( url, this.loginService.getBearerToken2())
            .catch(
                (error: any) => Observable.throw(error.json()|| 'Server error')
            );
    }

    errorSubscribe(error) { console.log("Error happened : "); console.log( error) }
    completed() { console.log("the subscription is completed") }
}

@Injectable()
export abstract class DaycareService {
    abstract getDaycare(id: number) : Observable<Daycare>;
    abstract errorSubscribe(error);
    abstract completed();
}