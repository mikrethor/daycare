import {Component, NgZone, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DaycareService} from '../../services/daycare-service';
import {Daycare, Role, User} from '../../pojo/pojo';
import {UserService} from "../../services/user-service";
import {RoleService} from "../../services/role-service";
import {NGXLogger} from "ngx-logger";


@Component({
    selector: 'admin-edit-user',
    templateUrl: './edit-user.html',
})
export class AdminEditUserComponent implements OnInit {
    private user: User = User.create();
    private idDaycare: number;
    private idUser: number;
    private idAdmin: number;
    private daycare: Daycare = Daycare.create();
    private roles: Role[] = [];

    constructor(
        private daycareService: DaycareService,
        private userService: UserService,
        private roleService: RoleService,
        private zone: NgZone,
        private router: Router,
        private route: ActivatedRoute,
        private logger: NGXLogger
    ) { }

    ngOnInit() {

        this.route.params.subscribe(params => {
            this.idUser=params['idUser'];
            this.idAdmin=params['idAdmin'];
        });

        this.route.parent.params.subscribe(params => {
            this.idDaycare=params['idDaycare'];
            this.logger.debug("idDaycare:",this.idDaycare);
        });

        this.logger.debug("idUser :",this.idUser);
        this.logger.debug("idAdmin :",this.idAdmin);
        this.logger.debug("idDaycare :",this.idDaycare);

        this.daycareService.getDaycare(this.idDaycare).subscribe(
            (daycare) => {
                this.daycare = daycare;
            },
            (error)=>this.daycareService.errorSubscribe(error),
            ()=>this.daycareService.completed('DaycareService::getDaycare')

        );

        if(this.idUser!=null){
            this.userService.getUsersByIdByDaycareId(this.idDaycare,this.idUser).subscribe(
                (user) => {
                    this.zone.run(() => {
                        this.logger.debug(user);

                        this.user = user;
                    });
                },
                (error)=>this.userService.errorSubscribe(error),
                ()=>this.userService.completed('UserService::getUsersByIdByDaycareId')

            );
        }

        this.roleService.getRoles()
            .subscribe(
                (roles) => {
                    this.zone.run(() => {

                        for (let role of roles) {
                            role.checked = this.hasRole(this.user, role.name);
                            this.roles.push(role);

                        }
                    });

                },
                (error)=>this.roleService.errorSubscribe(error),
                ()=>this.roleService.completed('RoleService::getRoles')
            );
    }

    create() {
        this.logger.debug("create");
        this.user.roles=[]
        for(let role of this.roles){
            if(role.checked){
                this.user.roles.push(role)
            }
        }

        this.logger.info("test roles : ",this.roles);

        this.user.daycare=this.daycare;
        this.userService.create(this.idDaycare,this.user).subscribe(
            (user) => {
                this.user = user;

                this.router.navigate(['daycare',this.idDaycare,{ outlets: { undernavbar: 'admin/'+this.idAdmin+'/users' } }]);
            },
            (error)=>this.userService.errorSubscribe(error),
            ()=>this.userService.completed('UserService::create')

        );
    }

    hasRole(user:User,role:String){
        return this.userService.isInRoles(role,user.roles);
    }

    toLowercaseExceptFirstCharacter(test:string,role:Role){
        return test.substr(0,1)+test.substr(1).toLowerCase();
    }

}