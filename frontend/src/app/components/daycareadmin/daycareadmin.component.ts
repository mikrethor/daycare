import { Component, Output, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../../services/login-service';
import { Observable, Subscription } from 'rxjs/Rx';
import { DaycareService} from '../../services/daycare-service';
import { Educator, Child, Daycare } from '../../pojo/pojo';

@Component({
    selector: 'daycareadmin',
    templateUrl: './daycareadmin.html',
})
export class DaycareAdminComponent implements OnInit {
    private educator: Educator = new Educator(0, "", "",0);
    private children: Child[] = [];
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
                this.educator = new Educator(jsonEducator.id, jsonEducator.firstName, jsonEducator.lastName,jsonEducator.daycare);
            },
            this.service.errorSubscribe,
            this.service.completed
        );

        this.service.getChildren(this.idDayCare)
            .subscribe(
            (json) => {
                for (let child of json) {
                    this.children.push(new Child(child.id, child.firstName, child.lastName,child.daycare));
                }
            },
            this.service.errorSubscribe,
            this.service.completed
            );
    }
}