import {Component, OnInit} from '@angular/core';
import {DaycareService} from '../../services/daycare-service';
import {Child, Daycare, Educator} from '../../pojo/pojo';
import {EducatorService} from "../../services/educator-service";
import {ChildService} from "../../services/child-service";


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

            (jsonEducator) => {
                this.educator = jsonEducator;
            },
            this.educatorService.errorSubscribe,
            this.educatorService.completed
        );

        this.childService.getAllByDaycareId(this.idDayCare)
            .subscribe(
            (json) => {
                for (let child of json) {
                    console.log(child.firstname+" "+child.lastname);
                    this.children.push(child);
                }
            },
            this.childService.errorSubscribe,
            this.childService.completed
            );
    }

}