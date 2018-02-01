import {Component, OnInit} from '@angular/core';
import {DaycareService} from '../../services/daycare-service';
import {Child, Educator} from '../../pojo/pojo';
import {EducatorService} from "../../services/educator-service";
import {ChildService} from "../../services/child-service";
import {NGXLogger} from "ngx-logger";
import {ActivatedRoute} from "@angular/router";


@Component({
    selector: 'educator',
    templateUrl: './educator.html',
})
export class EducatorComponent implements OnInit {
    educator: Educator = Educator.create();
    children: Child[] = [];
    idDayCare: number;
    idEducator: number;

    constructor(
        private daycareService: DaycareService,
        private educatorService: EducatorService,
        private childService: ChildService,
        private route: ActivatedRoute,
        private logger: NGXLogger
    ) { }

    ngOnInit() {
        this.logger.info("EducatorComponent::NgOnInit");
        this.route.parent.params.subscribe(params => {
            this.idDayCare=params['idDaycare'];
            this.logger.debug("idDaycare:",this.idDayCare);
        });

        this.route.params.subscribe(params => {
            this.idEducator = params['idEducator'];
            this.logger.debug("idDaycare:", this.idEducator);
        });

        this.educatorService.getOneById(this.idDayCare, this.idEducator).subscribe(

            (jsonEducator) => {
                this.educator = jsonEducator;
            },
            (error)=> this.educatorService.errorSubscribe(error),
            ()=>this.educatorService.completed('EducatorService::getOneById')
        );

        this.childService.getAllByDaycareId(this.idDayCare)
            .subscribe(
                (json) => {
                    for (let child of json) {
                        this.logger.debug(child);
                        this.children.push(child);
                    }
                },
                (error)=> this.childService.errorSubscribe(error),
                ()=>this.childService.completed('ChildService::getAllByDaycareId')
            );
    }

}