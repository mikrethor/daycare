import { Component, Output, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';
import { LoginService} from '../../services/login-service';
import { DaycareService} from '../../services/daycare-service';

@Component({
    selector: 'login',
    templateUrl: './login.html',
    // providers: [LoginService]
})
export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;
    connected = false;
    logged = false;
    
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private loginService: LoginService,
        private daycareService: DaycareService,
) { }

    ngOnInit() {
//        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    login() {
        this.loading = true;
        //route vers la page en fonction du profil
        this.logged = this.loginService.login(this.model.username,this.model.password);
        this.loading = false;
        console.log("Logged ? :"+this.logged);
       console.log( this.daycareService.getDaycare(1));

    }
}