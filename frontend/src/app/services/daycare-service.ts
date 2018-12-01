import {Injectable} from '@angular/core';
import {ConstantsService} from './constants-service';
import {LoginService} from './login-service';
import {HttpClient} from '@angular/common/http';
import {Daycare} from '../pojo/pojo';
import {Observable} from 'rxjs/Rx';
import 'rxjs/Rx';
import {NGXLogger} from "ngx-logger";
import {Service, ServiceImpl} from "./service";

@Injectable()
export class DaycareServiceImpl extends ServiceImpl implements DaycareService{
    private daycare:Daycare;
    constructor(
        readonly http: HttpClient,
        readonly constantService: ConstantsService,
        readonly loginService: LoginService,
        readonly logger: NGXLogger
    ) {super(logger);}

    getDaycare(id: number): Observable<Daycare> {
        this.logger.debug("getDaycare :", id);
        let endpoint = this.constantService.API_ENDPOINT;
        let url = endpoint+"/daycares/"+id;

        return this.http.get<Daycare>( url, this.loginService.getBearerToken())
            .catch(
                (error: any) => Observable.throw(error || 'Server error')
            );
    }
}

@Injectable()
export abstract class DaycareService extends Service{
    abstract getDaycare(id: number) : Observable<Daycare>;
}