import {Component, OnInit} from '@angular/core';
import {DaycareService} from '../../services/daycare-service';
import {Child, Daycare, Educator, Sumups} from '../../pojo/pojo';
import {EducatorService} from "../../services/educator-service";
import {ChildService} from "../../services/child-service";
import {SumupService} from "../../services/sumup-service";


@Component({
    selector: 'educator',
    templateUrl: './educator.html',
})
export class EducatorComponent implements OnInit {
    private educator: Educator = new Educator(null, "", "", null);
    private children: Child[] = [];
    private sumups: Sumups[] = [];
    private selectedChild: Child;
    private idDayCare: number = 1;
    private daycare: Daycare = new Daycare(0, "");

    constructor(
        private daycareService: DaycareService,
        private educatorService: EducatorService,
        private childService: ChildService,
        private sumupService: SumupService,
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
                this.educator = new Educator(jsonEducator.id, jsonEducator.firstName, jsonEducator.lastName, jsonEducator.daycare);
            },
            this.educatorService.errorSubscribe,
            this.educatorService.completed
        );

        this.childService.getAllByDaycareId(this.idDayCare)
            .subscribe(
            (json) => {
                for (let child of json) {
                    console.log(child.firstname+" "+child.lastname);
                    this.children.push(new Child(child.id, child.firstname, child.lastname, child.daycare));
                }
            },
            this.childService.errorSubscribe,
            this.childService.completed
            );
    }

    selectChild(index: number) {
        this.selectedChild = this.children[index];
        this.sumups = [];
        this.sumupService.getAllByChildId(this.idDayCare, this.selectedChild.id).subscribe(
            (json) => {
                for (let sumup of json) {
                    this.sumups.push(new Sumups(
                        sumup.id,
                        sumup.child,
                        sumup.mood,
                        sumup.sleep,
                        sumup.appetite,
                        sumup.comment,
                        sumup.educator,
                        sumup.day
                    ));
                }
            },
            this.daycareService.errorSubscribe,
            this.daycareService.completed
        );
    }

    add(index:number){}
    edit(index:number){}

}