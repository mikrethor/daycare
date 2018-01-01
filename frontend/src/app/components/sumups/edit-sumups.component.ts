import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Child, Daycare, Sumups, User} from '../../pojo/pojo';
import {SumupService} from "../../services/sumup-service";
import {DateService} from "../../services/date-service";


@Component({
    selector: 'edit-sumups',
    templateUrl: './edit-sumups.html',
})
export class EditSumupsComponent implements OnInit {
    private user: User;
    private child: Child = Child.create();
    private sumup: Sumups = Sumups.create();
    private idDayCare: number = 1;
    private idChild: number = 1;
    private displaySumup= {
        selectedMoodId: 0,
        selectedSleepId: 0,
        selectedAppetiteId: 0
    };
    private appetites: number[] = [0, 5, 10];
    private moods: number[] = [0, 5, 10];
    private sleeps: number[] = [0, 5, 10];

    constructor(
        private sumupService: SumupService,
        private dateService: DateService,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.user = new User(0, "", "", "", null,null);
        this.idDayCare = 1;//this.route.snapshot.params['idDaycare'];
        this.idChild = 1;//this.route.snapshot.params['idParent'];

        this.sumupService.getOneByChildIdAndDay(this.idDayCare, this.idChild, this.dateService.getCurrentDay()).subscribe(
            (jsonSumup) => {
                this.sumup = jsonSumup;

                this.child=this.sumup.child;

                this.displaySumup = {
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

                return -1;
        }
    }
}