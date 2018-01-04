import {Component, NgZone, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
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
    private idDaycare: number = 1;
    private idUser: number = 1;
    private idAdmin: number = 1;
    private daycare: Daycare = Daycare.create();
    private roles: Role[] = [];
    model: any = {};

    constructor(
        private daycareService: DaycareService,
        private userService: UserService,
        private roleService: RoleService,
        private zone: NgZone,
        private router: Router,
        private route: ActivatedRoute,
    ) { }

    ngOnInit() {

        this.route.params.subscribe(params => {
            this.idUser=params['idUser'];
            this.idDaycare=params['idDaycare'];
            this.idAdmin=params['idAdmin'];
        });

        console.log(" idUser : "+this.idUser);
        console.log(" idDaycare : "+this.idDaycare);

        this.daycareService.getDaycare(this.idDaycare).subscribe(
            (daycare) => {
                this.daycare = daycare;
            },
            this.daycareService.errorSubscribe,
            this.daycareService.completed

        );

        this.userService.getUsersByIdByDaycareId(this.idDaycare,this.idUser).subscribe(
            (user) => {

                console.log(user);

                this.user = user;
            },
            this.userService.errorSubscribe,
            this.userService.completed

        );

        this.roleService.getRoles()
            .subscribe(
                (roles) => {
                    for (let role of roles) {
                        this.roles.push(role);
                    }
                },
                this.roleService.errorSubscribe,
                this.roleService.completed
            );
    }

    create() {
        this.user = User.create();
    }
}