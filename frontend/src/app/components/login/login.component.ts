import { Component, Output, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';
import { LoginService} from '../../services/login-service';

@Component({
    selector: 'login',
    templateUrl: './login.html',
})
export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;
    connected = false;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        // private loginService: LoginService,

) { }

    ngOnInit() {
//        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    login() {
        this.loading = true;
        // console.log(this.loginService.login("john.doe","jwtpass"));
    }
}