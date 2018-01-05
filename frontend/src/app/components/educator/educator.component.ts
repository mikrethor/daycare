import {Component, OnInit} from '@angular/core';
import {DaycareService} from '../../services/daycare-service';
import {Child, Daycare, Educator} from '../../pojo/pojo';
import {EducatorService} from "../../services/educator-service";
import {ChildService} from "../../services/child-service";
import {NGXLogger} from "ngx-logger";


@Component({
    selector: 'educator',
    templateUrl: './educator.html',
})
export class EducatorComponent implements OnInit {
    private educator: Educator = Educator.create();
    private children: Child[] = [];
    private idDayCare: number = 1;
    private daycare: Daycare = Daycare.create();

    constructor(
        private daycareService: DaycareService,
        private educatorService: EducatorService,
        private childService: ChildService,
        private logger: NGXLogger
    ) { }

    ngOnInit() {
        this.daycareService.getDaycare(this.idDayCare).subscribe(
            (daycare) => {
                this.daycare = daycare;
            },
            (error)=>this.daycareService.errorSubscribe(error),
            ()=>this.daycareService.completed('DaycareService::getDaycare')
        );

        this.educatorService.getOneById(this.idDayCare, 1).subscribe(

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