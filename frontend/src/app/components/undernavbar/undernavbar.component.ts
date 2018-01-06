import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {NGXLogger} from "ngx-logger";
import {LoginService} from "../../services/login-service";

@Component({
    selector: 'daycare-undernavbar',
    templateUrl: './undernavbar.html'
})
export class UnderNavbarComponent implements OnInit{
    constructor(
        private router: Router,
        private loginService: LoginService,
        private logger: NGXLogger
    ) { }

    ngOnInit(){
        this.logger.info('undernavbar');
        // this.router.navigateByUrl('/(undernavbar:user)');

        this.router.navigate(['daycare', { outlets: { undernavbar: 'user' } }]);
    }

}
