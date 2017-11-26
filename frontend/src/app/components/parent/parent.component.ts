import { Component, Output, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../../services/login-service';
import { Observable, Subscription } from 'rxjs/Rx';
import { DaycareService, Parent, Child, Sumups } from '../../services/daycare-service';
import { User } from '../../services/daycare-service';


@Component({
    selector: 'parent',
    templateUrl: './parent.html',
})
export class ParentComponent implements OnInit {
    private user: User;
    private parent: Parent = new Parent(0, "", "", null);
    private children: Child[] = [];
    private child= {
        selectedMoodId: 'health-80plus.svg',
        selectedSleepId: 'health-80plus.svg',
        selectedAppetiteId: 'health-80plus.svg'
    }
    private sumup: Sumups = new Sumups(0, 0, 0, 0, 0, "", 0, 0);
    private idDayCare: number = -61;
    private idParent: number = -61;

    constructor(private service: DaycareService, private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.user= new User(0, 0, 0, 0, "", 0);
        this.idDayCare = this.route.snapshot.params['idDaycare'];
        this.idParent = this.route.snapshot.params['idParent'];


        this.service.getParent(this.idDayCare, this.idParent).subscribe(
            (jsonParent) => {
                this.parent = new Parent(jsonParent.id, jsonParent.firstName, jsonParent.lastName, jsonParent.daycare);
            },
            this.service.errorSubscribe,
            this.service.completed
        );

        this.service.getChildrenByParentId(this.idDayCare, this.idParent).subscribe(
            (jsonChildren) => {
                for (let child of jsonChildren) {
                    this.children.push(new Child(child.id, child.firstName, child.lastName, this.idDayCare));
                }
            },
            this.service.errorSubscribe,
            this.service.completed
        );

        //TODO determiner date du jour
        this.service.getSumup(this.idDayCare, this.idParent, "2017-03-26").subscribe(
            (jsonSumup) => {
                this.sumup = new Sumups(
                    jsonSumup.id,
                    jsonSumup.child,
                    jsonSumup.mood,
                    jsonSumup.sleep,
                    jsonSumup.appetite,
                    jsonSumup.comment,
                    jsonSumup.educator,
                    jsonSumup.day
                );
                this.child = {
                    selectedMoodId: this.getImage(this.sumup.mood),
                    selectedSleepId: this.getImage(this.sumup.sleep),
                    selectedAppetiteId: this.getImage(this.sumup.appetite)
                }
            },
            this.service.errorSubscribe,
            this.service.completed
        );
    }

    getImage(level: number) {

        switch (level) {
            case 0:
                return 'health-40to59.svg';
            case 5:
                return 'health-60to79.svg';
            case 10:
                return 'health-80plus.svg';

            default:
                return "";
        }
    }

    select(index:number){

    }
}