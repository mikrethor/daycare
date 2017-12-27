import { Component, Output, OnInit } from '@angular/core';
import { DaycareService} from '../../services/daycare-service';
import { Educator, Child, Daycare } from '../../pojo/pojo';
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
            (json) => {
                this.daycare = new Daycare(json.id, json.name);
            },
            this.daycareService.errorSubscribe,
            this.daycareService.completed

        );

        this.educatorService.getOneById(this.idDayCare, 1).subscribe(
            (jsonEducator) => {
                this.educator = new Educator(jsonEducator.id, jsonEducator.firstName, jsonEducator.lastName,jsonEducator.daycare);
            },
            this.educatorService.errorSubscribe,
            this.educatorService.completed
        );

        this.childService.getAllByDaycareId(this.idDayCare)
            .subscribe(
                (json) => {
                    for (let child of json) {
                        this.children.push(new Child(child.id, child.firstname, child.lastname,child.daycare));
                    }
                },
                this.childService.errorSubscribe,
                this.childService.completed
            );
    }
}