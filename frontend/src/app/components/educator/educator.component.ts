import { Component, Output, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../../services/login-service';
import { Observable, Subscription } from 'rxjs/Rx';
import { DaycareService, Educator, Child, Daycare, Sumups } from '../../services/daycare-service';


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

    constructor(private service: DaycareService
    ) { }

    ngOnInit() {
        this.service.getDaycare(this.idDayCare).subscribe(
            (json) => {
                this.daycare = new Daycare(json.id, json.name);
            },
            this.service.errorSubscribe,
            this.service.completed
        );

        this.service.getEducator(this.idDayCare, 1).subscribe(

            (jsonEducator) => {
                this.educator = new Educator(jsonEducator.id, jsonEducator.firstName, jsonEducator.lastName, jsonEducator.daycare);
            },
            this.service.errorSubscribe,
            this.service.completed
        );

        this.service.getChildren(this.idDayCare)
            .subscribe(
            (json) => {
                for (let child of json) {
                    this.children.push(new Child(child.id, child.firstName, child.lastName, child.daycare));
                }
            },
            this.service.errorSubscribe,
            this.service.completed
            );
    }

    // selectChild(index: number) {
    //     this.selectedChild = this.children[index];
    //     this.sumups = [];
    //     this.service.getSumups(this.idDayCare, this.selectedChild.id).subscribe(
    //         (json) => {
    //             for (let sumup of json) {
    //                 this.sumups.push(new Sumups(
    //                     sumup.id,
    //                     sumup.child,
    //                     sumup.mood,
    //                     sumup.sleep,
    //                     sumup.appetite,
    //                     sumup.comment,
    //                     sumup.educator,
    //                     sumup.day
    //                 ));
    //             }
    //         },
    //         this.service.errorSubscribe,
    //         this.service.completed
    //     );
    // }

    add(index:number){}
    edit(index:number){}

}