import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService,} from '../../services/user-service';
import {Daycare, Role, User} from '../../pojo/pojo';

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
    daycare:Daycare=new Daycare(0,"");
    user:User=new User(0,"","","",[],new Daycare(0,""));

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private userService: UserService,
) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.username = params['username']; 
        });

        this.userService.getUser(this.username).subscribe(
            user => {
                this.firstName=user.firstName;
                this.lastName=user.lastName;
                this.roles=user.roles;
                this.daycare=user.daycare;
                this.user=user;
                this.userService.set(user);
            },
            this.userService.errorSubscribe,
            this.userService.completed);
    }
    
}