import { Component, Output, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';
import { LoginService} from '../../services/login-service';
import { DaycareService, } from '../../services/daycare-service';
import { UserService, } from '../../services/user-service';
import { Role, Daycare, User} from '../../pojo/pojo';
import { RouterModule, Routes } from '@angular/router';

@Component({
    selector: 'user',
    templateUrl: './user.html',
    // providers: [LoginService]
})
export class UserComponent implements OnInit {
    model: any = {};
    username:String;
    lastName:String="";
    firstName:String="";
    roles:Array<Role>;
    daycare:Daycare=new Daycare(0,"");
    user:User=new User(0,"","","",[],new Daycare(0,""));

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private daycareService: DaycareService,
        private userService: UserService,
) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.username = params['username']; 
            });

        this.daycareService.getUser(this.username).subscribe(
            data => {
                this.firstName=data.firstName;
                this.lastName=data.lastName;
                this.roles=data.roles;
                this.daycare=data.daycare;
                this.user=new User(data.id,data.username,data.firstName,data.lastName,data.roles,data.daycare);
            },
            this.daycareService.errorSubscribe,
            this.daycareService.completed);
            // this.userService.set(this.user);
            // console.log(this.userService.isEducator());       
    }
    
}