import { Component, Output, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';

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

) { }

    ngOnInit() {
//        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    login() {
        this.loading = true;
    }
}