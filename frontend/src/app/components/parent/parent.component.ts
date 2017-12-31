import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Child, Parent, Sumups, User} from '../../pojo/pojo';
import {SumupService} from "../../services/sumup-service";
import {ParentService} from "../../services/parent-service";
import {ChildService} from "../../services/child-service";


@Component({
    selector: 'parent',
    templateUrl: './parent.html',
})
export class ParentComponent implements OnInit {
    private user: User;
    private parent: Parent = Parent.create();
    private children: Child[] = [];
    private child= {
        selectedMoodId: 0,
        selectedSleepId: 0,
        selectedAppetiteId: 0
    };
    private sumup: Sumups = Sumups.create();
    private idDayCare: number = -61;
    private idParent: number = -61;

    constructor(
        private sumupService: SumupService,
        private parentService: ParentService,
        private childService: ChildService,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.user = User.create();
        this.idDayCare = this.route.snapshot.params['idDaycare'];
        this.idParent = this.route.snapshot.params['idParent'];


        this.parentService.getOneById(this.idDayCare, this.idParent).subscribe(
            (jsonParent) => {
                this.parent = jsonParent;
            },
            this.parentService.errorSubscribe,
            this.parentService.completed
        );

        this.childService.getAllByParentId(this.idDayCare, this.idParent).subscribe(
            (jsonChildren) => {
                for (let child of jsonChildren) {
                    this.children.push(child);
                }
            },
            this.childService.errorSubscribe,
            this.childService.completed
        );

        //TODO determiner date du jour
        this.sumupService.getOneByChildIdAndDay(this.idDayCare, this.idParent, "2017-12-26").subscribe(
            (jsonSumup) => {
                console.log("test"+jsonSumup);
                this.sumup = jsonSumup;
                this.child = {
                    selectedMoodId: this.sumup.mood,
                    selectedSleepId: this.sumup.sleep,
                    selectedAppetiteId: this.sumup.appetite
                }
            },
            this.sumupService.errorSubscribe,
            this.sumupService.completed
        );
    }

    getImage(level: number) {
        switch (level) {
            case 0:
                return '/assets/scalableVectorGraphics/health-40to59.svg';
            case 5:
                return '/assets/scalableVectorGraphics/health-60to79.svg';
            case 10:
                return '/assets/scalableVectorGraphics/health-80plus.svg';
            default:
                return "";
        }
    }


    select(index:number){

    }

    static getPosition(level: string) {
        
        switch (level) {
            case "BAD":
                return 0;
            case "MEDIUM":
                return 1;
            case "GOOD":
                return 2;
            default:
                return -1;
        }
    }
}