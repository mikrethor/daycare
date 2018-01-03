import {Component, NgZone, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {DaycareService} from '../../services/daycare-service';
import {Daycare, User} from '../../pojo/pojo';
import {UserService} from "../../services/user-service";
import {ActivatedRoute} from "@angular/router";


@Component({
    selector: 'admin-user',
    templateUrl: './user.html',
})
export class AdminUserComponent implements OnInit, OnChanges {
    private user: User = User.create();
    private users: User[] = [];
    private idDaycare: number = 1;
    private idUser: number = 1;
    private daycare: Daycare = Daycare.create();
    private deleted: boolean = false;
    model: any = {};

    constructor(
        private daycareService: DaycareService,
        private userService: UserService,
        private zone: NgZone,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.idUser = params['idAdmin'];
        });


        this.daycareService.getDaycare(this.idDaycare).subscribe(
            (daycare) => {
                this.daycare = daycare;
            },
            this.daycareService.errorSubscribe,
            this.daycareService.completed
        );

        this.getUsers();
    }

    getUsers(){
        this.userService.getUsersByDaycareId(this.idDaycare).subscribe(
            (users) => {
                this.users=[];
                for (let user of users) {
                    this.users.push(user);
                }
            },
            this.daycareService.errorSubscribe,
            this.daycareService.completed);
    }

    remove(index: number) {
        this.userService.delete(this.idDaycare, this.users[index].id).subscribe(
            data => {
                this.deleted = (data == true);
                if (this.deleted) {
                    this.zone.run(() => {
                        this.getUsers();
                    });
                }
            },
            this.daycareService.errorSubscribe,
            this.daycareService.completed);
    }


    edit(index: number) {
        //edit
        console.log("edit : "+index);
    }

    ngOnChanges(changes: SimpleChanges) {
        this.getUsers();
    }


}