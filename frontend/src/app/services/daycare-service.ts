import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {ConstantsService} from './constants-service';
import {LoginService} from './login-service';
import {Daycare} from '../pojo/pojo';
import {Observable} from 'rxjs/Rx';
import 'rxjs/Rx';

@Injectable()
export class DaycareServiceImpl implements DaycareService{
    private daycare:Daycare;
    constructor(
        private http: Http,
        private constantService: ConstantsService,
        private loginService: LoginService
    ) {}

    getDaycare(id: number): Observable<Daycare> {
        console.log("getDaycare " +id);
        let endpoint = this.constantService.API_ENDPOINT;
        let url = endpoint+"/daycares/"+id;


        return this.http.get( url, this.loginService.getBearerToken())
            .map((response) =>
                {return response.json();}
            )
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