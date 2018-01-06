import {Component, NgZone, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LoginService} from '../../services/login-service';
import {NGXLogger} from "ngx-logger";

@Component({
    selector: 'login',
    templateUrl: './login.html',
})
export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;
    dataToken: String;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private loginService: LoginService,
        private logger: NGXLogger,
        private zone: NgZone,
    ) { }

    ngOnInit() {
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    login() {
        this.loading = true;
        //route to role page
        this.loginService.login(this.model.username,this.model.password).subscribe(
            data => {

                this.zone.run(() => {
                    this.loginService.saveToken(data.access_token);
                    this.dataToken=data.access_token;
                    this.router.navigateByUrl('/daycare');
                    this.logger.info("Login successful with",this.model.username)
                });

            },
            (error)=>{ this.logger.error("Error happened : in "," LoginService::login", error);
                alert('Invalid Credentials :'+error);}

            ,()=>{this.logger.info("LoginService::login completed")});
        this.loading = false;
    }
}