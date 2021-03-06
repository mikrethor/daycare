import {Component, NgZone, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DaycareService} from '../../services/daycare-service';
import {Child, Daycare} from '../../pojo/pojo';
import {ChildService} from "../../services/child-service";
import {UserService} from "../../services/user-service";
import {NGXLogger} from "ngx-logger";


@Component({
    selector: 'admin-edit-child',
    templateUrl: './edit-child.html',
})
export class AdminEditChildComponent implements OnInit {
    child: Child = Child.create();
    idChild: number;
    idDaycare: number = 1;
    daycare: Daycare = Daycare.create();
    idAdmin: number;
    model: any = {};

    constructor(
        private daycareService: DaycareService,
        private childService: ChildService,
        private userService: UserService,
        private zone: NgZone,
        private route: ActivatedRoute,
        private router: Router,
        private logger: NGXLogger
    ) {}

    ngOnInit() {
        this.logger.info("AdminEditChildComponent::ngOnInit");
        this.route.params.subscribe(params => {
            this.idChild = params['idChild'];
            this.idAdmin=params['idAdmin'];

            this.logger.debug("idChild:",this.idChild);
            this.logger.debug("idAdmin:",this.idAdmin);
        });
        this.route.parent.params.subscribe(params => {
            this.idDaycare=params['idDaycare'];
            this.logger.debug("idDaycare:",this.idDaycare);
        });

        this.daycareService.getDaycare(this.idDaycare).subscribe(
            (daycare) => {
                this.daycare = daycare;
                this.child.daycare=daycare;
            },
            (error)=>this.daycareService.errorSubscribe(error),
            this.daycareService.completed('DaycareService::getDaycare')
        );
        if(this.idChild>0){
            this.childService.getOneByDaycareId(this.idDaycare,this.idChild).subscribe(
                (child) => {
                    this.child = child;
                    this.model.id=this.child.id;
                    this.model.firstname=this.child.firstname;
                    this.model.lastname=this.child.lastname;
                    this.logger.debug(this.child)
                },
                (error)=>this.childService.errorSubscribe(error),
                this.childService.completed('ChildService::getOneByDaycareId')
            );
        }
    }

    create() {
        this.child.firstname= this.model.firstname;
        this.child.lastname=this.model.lastname;
        this.childService.create(this.idDaycare, this.child).subscribe(
            data => {
                this.zone.run(() => {
                    this.router.navigate(['daycare',this.idDaycare,{ outlets: { undernavbar: 'admin/'+this.idAdmin+'/children' } }]);
                });
            },
            (error)=>this.childService.errorSubscribe(error),
            this.childService.completed('ChildService::create'));
    }
}