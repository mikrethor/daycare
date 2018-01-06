import {Component, NgZone, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {NGXLogger} from "ngx-logger";
import {LoginService} from "../../services/login-service";
import {UserService} from "../../services/user-service";

@Component({
    selector: 'daycare-undernavbar',
    templateUrl: './undernavbar.html'
})
export class UnderNavbarComponent implements OnInit{
    constructor(
        private router: Router,
        private loginService: LoginService,
        private userService: UserService,
        private logger: NGXLogger,
        private zone: NgZone,
    ) { }

    idDaycare:number=0;

    ngOnInit(){
        this.logger.info('undernavbar');

        this.userService.getUser(this.loginService.username()).subscribe(
            user => {
                this.zone.run(() => {
                    //TODO avoid getUser by storing id daycare and daycare name
                    this.idDaycare = user.daycare.id;
                    this.router.navigate(['daycare',this.idDaycare,{ outlets: { undernavbar: 'user/'+this.loginService.username() } }]);
                });
            },
            (error)=>this.userService.errorSubscribe(error),
            ()=>this.userService.completed('UserService::getUser'));





    }

}
