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
    private educator: Educator = new Educator(0, "", "",0);
    private children: Child[] = [];
    private idDayCare: number = 1;
    private daycare: Daycare = new Daycare(0, "");

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
            this.daycareService.errorSubscribe,
            this.daycareService.completed

        );

        this.educatorService.getOneById(this.idDayCare, 1).subscribe(
            (educator) => {
                this.educator = educator;
            },
            this.educatorService.errorSubscribe,
            this.educatorService.completed
        );

        this.childService.getAllByDaycareId(this.idDayCare)
            .subscribe(
                (children) => {
                    for (let child of children) {
                        this.children.push(child);
                    }
                },
                this.childService.errorSubscribe,
                this.childService.completed
            );
    }
}