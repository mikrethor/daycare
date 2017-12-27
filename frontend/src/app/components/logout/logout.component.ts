import { Component, OnInit } from '@angular/core';
import { LoginService} from '../../services/login-service';


@Component({
    selector: 'logout',
    template: '<span>Disconnect</span>',
})
export class LogoutComponent implements OnInit {
    constructor(
        private loginService: LoginService,
    ) { }
    ngOnInit() {
        this.logout();
    }

    logout() {
        this.loginService.logout();
    }
}