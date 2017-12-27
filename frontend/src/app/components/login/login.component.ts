import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LoginService} from '../../services/login-service';


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
        private loginService: LoginService
    ) { }

    ngOnInit() {
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    login() {
        this.loading = true;
        //route to role page
        this.loginService.login(this.model.username,this.model.password).subscribe(
            data => {
                this.loginService.saveToken(data);
                this.dataToken=data;
                this.router.navigateByUrl('/daycare/user/'+this.model.username);
            },
            err => {
                alert('Invalid Credentials :'+err)
            });
        this.loading = false;
    }
}