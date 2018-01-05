import {Component, OnInit} from '@angular/core';
import {DaycareService} from '../../services/daycare-service';
import {Child, Daycare, Educator} from '../../pojo/pojo';
import {ChildService} from "../../services/child-service";
import {EducatorService} from "../../services/educator-service";

@Component({
    selector: 'daycareadmin',
    templateUrl: './daycareadmin.html',
})
export class DaycareAdminComponent implements OnInit {
    private educator: Educator = Educator.create();
    private children: Child[] = [];
    private idDayCare: number = 1;
    private daycare: Daycare = Daycare.create();

    constructor(
        private daycareService: DaycareService,
        private childService: ChildService,
        private educatorService: EducatorService,
    ) { }

    ngOnInit() {
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