import {Component, NgZone, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {DaycareService} from '../../services/daycare-service';
import {Daycare, Role, User} from '../../pojo/pojo';
import {UserService} from "../../services/user-service";
import {RoleService} from "../../services/role-service";


@Component({
    selector: 'admin-edit-user',
    templateUrl: './edit-user.html',
})
export class AdminEditUserComponent implements OnInit {
    private user: User = User.create();
    private idDayCare: number = 1;
    private daycare: Daycare = Daycare.create();
    private roles: Role[] = [];
    model: any = {};

    constructor(
        private daycareService: DaycareService,
        private userService: UserService,
        private roleService: RoleService,
        private zone: NgZone,
        private router: Router,
    ) { }

    ngOnInit() {

        this.daycareService.getDaycare(this.idDayCare).subscribe(
            (daycare) => {
                this.daycare = daycare;
            },
            this.daycareService.errorSubscribe,
            this.daycareService.completed

        );

        this.roleService.getRoles()
            .subscribe(
                (roles) => {
                    for (let role of roles) {
                        console.log(role.id+" "+role.name);
                        this.roles.push(role);
                    }
                },
                this.roleService.errorSubscribe,
                this.roleService.completed
            );
    }

    create() {
        this.user = User.create();
        // this.parentService.create(this.idDayCare, this.user).subscribe(
        //     data => {
        //         this.zone.run(() => {
        //             this.router.navigate(['daycare', this.idDayCare, 'admin', 1, 'parents']);
        //         });
        //     },
        //     this.parentService.errorSubscribe,
        //     this.parentService.completed);
    }
}