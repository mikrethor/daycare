import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from "rxjs/Observable";

@Injectable()
export class CrosOriginInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log("intercept");
        console.log(req);


        const changedReq = req.clone({
            headers: req.headers.set('Allow-Control-Allow-Origin', '*')


            // .set('Content-Type','application/json')
            // .set('Accept', 'application/json')
            // .set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT')
            // .set('Access-Control-Allow-Origin', '*')

            // Access-Control-Allow-Headers: X-Custom-Header
            //     .set('Access-Control-Allow-Headers', "X-Requested-With, Content-Type, Origin, Authorization, Accept, Client-Security-Token, Accept-Encoding")

        });

        return next.handle(changedReq);
    }
}