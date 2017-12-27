import { Component, Output, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';
import { LoginService} from '../../services/login-service';
import { DaycareService} from '../../services/daycare-service';
import { UserService} from '../../services/user-service';
import { User } from '../../pojo/pojo';


@Component({
    selector: 'login',
    templateUrl: './login.html',
})
export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;
    connected = false;
    logged = false;
    dataToken: String;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private loginService: LoginService,
        private daycareService: DaycareService,
        private userService: UserService,
        private zone: NgZone
) { }

    ngOnInit() {
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    login() {
        this.loading = true;
        //route to role page
       this.loginService.login(this.model.username,this.model.password)      .subscribe(
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