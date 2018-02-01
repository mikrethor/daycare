import {Component, OnInit} from '@angular/core';
import {DaycareService} from '../../services/daycare-service';
import {Child, Daycare, Educator} from '../../pojo/pojo';
import {ChildService} from "../../services/child-service";
import {EducatorService} from "../../services/educator-service";
import {NGXLogger} from "ngx-logger";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'daycareadmin',
    templateUrl: './daycareadmin.html',
})
export class DaycareAdminComponent implements OnInit {
    educator: Educator = Educator.create();
    children: Child[] = [];
    idDayCare: number;
    daycare: Daycare = Daycare.create();

    constructor(
        private daycareService: DaycareService,
        private childService: ChildService,
        private educatorService: EducatorService,
        private route: ActivatedRoute,
        private logger: NGXLogger
    ) { }

    ngOnInit() {
        this.route.parent.params.subscribe(params => {
            this.idDayCare=params['idDaycare'];
            this.logger.debug("idDaycare:",this.idDayCare);
        });

        this.daycareService.getDaycare(this.idDayCare).subscribe(
            (daycare) => {
                this.daycare = daycare;
            },
            (error)=>this.daycareService.errorSubscribe(error),
            this.daycareService.completed('DaycareService::getDaycare')

        );

        this.educatorService.getOneById(this.idDayCare, 1).subscribe(
            (educator) => {
                this.educator = educator;
            },
            (error)=>this.educatorService.errorSubscribe(error),
            this.educatorService.completed('EducatorService::getOneById')
        );

        this.childService.getAllByDaycareId(this.idDayCare)
            .subscribe(
                (children) => {
                    for (let child of children) {
                        this.children.push(child);
                    }
                },
                (error)=>this.childService.errorSubscribe(error),
                this.childService.completed('ChildService::getAllByDaycareId')
            );
    }
}