import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService,} from '../../services/user-service';
import {Daycare, Role, User} from '../../pojo/pojo';
import {NGXLogger} from "ngx-logger";

@Component({
    selector: 'user',
    templateUrl: './user.html',
})
export class UserComponent implements OnInit {
    model: any = {};
    username:String;
    lastName:String="";
    firstName:String="";
    roles:Array<Role>;
    daycare:Daycare=Daycare.create();
    user:User=User.create();

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private userService: UserService,
        private logger: NGXLogger
    ) { }

    ngOnInit() {
        this.logger.debug("ngOnInit");
        this.route.params.subscribe(params => {
            this.username = params['username'];
        });

        this.userService.getUser(this.username).subscribe(
            user => {
                this.logger.debug("User : ",user);
                this.firstName=user.firstName;
                this.lastName=user.lastName;
                this.roles=user.roles;
                this.daycare=user.daycare;
                this.user=user;
                this.userService.set(user);
            },
            (error)=>this.userService.errorSubscribe(error),
            ()=>this.userService.completed('UserService::getUser')
        );
    }
}