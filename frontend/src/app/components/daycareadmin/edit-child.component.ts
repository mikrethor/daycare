import {Component, NgZone, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DaycareService} from '../../services/daycare-service';
import {Child, Daycare} from '../../pojo/pojo';
import {ChildService} from "../../services/child-service";
import {UserService} from "../../services/user-service";


@Component({
    selector: 'admin-edit-child',
    templateUrl: './edit-child.html',
})
export class AdminEditChildComponent implements OnInit {
    private child: Child = new Child(0, "", "", new Daycare(1,""));
    private idChild: number;
    private idDaycare: number = 1;
    private daycare: Daycare = new Daycare(0, "");
    private idAdmin: number;
    model: any = {};

    constructor(
        private daycareService: DaycareService,
        private childService: ChildService,
        private userService: UserService,
        private zone: NgZone,
        private route: ActivatedRoute,
        private router: Router,
    ) {}

    ngOnInit() {
        console.log("currentUser")


        this.route.params.subscribe(params => {
            this.idChild = params['idChild'];
            this.idAdmin=params['idAdmin'];
            this.idDaycare=params['idDaycare'];

        });

        this.daycareService.getDaycare(this.idDaycare).subscribe(
            (daycare) => {
                this.daycare = daycare;
                this.child.daycare=daycare;
            },
            this.daycareService.errorSubscribe,
            this.daycareService.completed

        );
        if(this.idChild>0){
            this.childService.getOneByDaycareId(this.idDaycare,this.idChild).subscribe(
                (child) => {
                    this.child = child;
                    this.model.id=this.child.id;
                    this.model.firstname=this.child.firstname;
                    this.model.lastname=this.child.lastname;
                    console.log(this.child)
                },
                this.childService.errorSubscribe,
                this.childService.completed
            );
        }
    }

    create() {
        this.child.firstname= this.model.firstname;
        this.child.lastname=this.model.lastname;
        this.childService.create(this.idDaycare, this.child).subscribe(
            data => {
                this.zone.run(() => {
                    this.router.navigate(['daycare', this.idDaycare, 'admin', this.idAdmin, 'children']);
                });
            },
            this.childService.errorSubscribe,
            this.childService.completed);
    }
}