import { Component, Output, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../../services/login-service';
import { Observable, Subscription } from 'rxjs/Rx';
import { DaycareService, } from '../../services/daycare-service';
import { User, Child, Parent, Sumups } from '../../pojo/pojo';


@Component({
    selector: 'edit-sumups',
    templateUrl: './edit-sumups.html',
})
export class EditSumupsComponent implements OnInit {
    private user: User;
    private child: Child = new Child(1, "Jean", "Valgeant", 1);
    private sumup: Sumups = new Sumups(0, 0, "BAD", "BAD", "BAD", "", 0, 0);
    private idDayCare: number = 1;
    private idParent: number = 1;
    private displaySumup= {
        selectedMoodId: 'BAD',
        selectedSleepId: 'BAD',
        selectedAppetiteId: 'BAD'
    }
    private appetites: string[] = ["BAD", "MEDIUM", "GOOD"];
    private moods: string[] = ["BAD", "MEDIUM", "GOOD"];
    private sleeps: string[] = ["BAD", "MEDIUM", "GOOD"];

    constructor(private service: DaycareService, private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.user = new User(0, "", "", "", null,null);
        this.idDayCare = 1;//this.route.snapshot.params['idDaycare'];
        this.idParent = 1;//this.route.snapshot.params['idParent'];

        //TODO determiner date du jour
        this.service.getSumup(this.idDayCare, this.idParent, "2017-12-26").subscribe(
            (jsonSumup) => {
                console.log(jsonSumup);
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
                    selectedMoodId: this.sumup.mood,
                    selectedSleepId: this.sumup.sleep,
                    selectedAppetiteId: this.sumup.appetite
                }
            },
            this.service.errorSubscribe,
            this.service.completed
        );
    }

    getImage(level: string) {
        
        switch (level) {
            case "BAD":
                return '/assets/scalableVectorGraphics/health-40to59.svg';
            case "MEDIUM":
                return '/assets/scalableVectorGraphics/health-60to79.svg';
            case "GOOD":
                return '/assets/scalableVectorGraphics/health-80plus.svg';
            default:
            console.log("default")+level;
                return "";
        }
    }
}