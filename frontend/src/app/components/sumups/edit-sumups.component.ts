import { Component, Output, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../../services/login-service';
import { Observable, Subscription } from 'rxjs/Rx';
import { DaycareService, Parent, Child, Sumups } from '../../services/daycare-service';
import { User } from '../../services/daycare-service';


@Component({
    selector: 'edit-sumups',
    templateUrl: '.$/edit-sumups.html',
})
export class EditSumupsComponent implements OnInit {
    private user: User;
    private child: Child = new Child(1, "Jean", "Valgeant", 1);
    private sumup: Sumups = new Sumups(0, 0, 0, 0, 0, "", 0, 0);
    private idDayCare: number = 1;
    private idParent: number = 1;
    private displaySumup= {
        selectedMoodId: 'health-80plus.svg',
        selectedSleepId: 'health-80plus.svg',
        selectedAppetiteId: 'health-80plus.svg'
    }
    private appetites: number[] = [0, 5, 10];
    private moods: number[] = [0, 5, 10];
    private sleeps: number[] = [0, 5, 10];

    constructor(private service: DaycareService, private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.user = new User(0, "", "", "", null,0);
        this.idDayCare = 1;//this.route.snapshot.params['idDaycare'];
        this.idParent = 1;//this.route.snapshot.params['idParent'];

        //TODO determiner date du jour
        this.service.getSumup(this.idDayCare, this.idParent, "2017-03-08").subscribe(
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
                this.displaySumup = {
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
}