import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Child, Sumups} from '../../pojo/pojo';
import {SumupService} from "../../services/sumup-service";
import {DateService} from "../../services/date-service";
import {NGXLogger} from "ngx-logger";


@Component({
    selector: 'edit-sumups',
    templateUrl: './edit-sumups.html',
})
export class EditSumupsComponent implements OnInit {
    child: Child = Child.create();
    sumup: Sumups = Sumups.create();
    sumups: Sumups[] = [];
    idDayCare: number;
    idChild: number;
    appetites: number[] = [0, 5, 10];
    moods: number[] = [0, 5, 10];
    sleeps: number[] = [0, 5, 10];
    appetite: number = 0;
    mood: number = 0;
    sleep: number = 0;
    current: number = 0;

    constructor(
        private sumupService: SumupService,
        private dateService: DateService,
        private route: ActivatedRoute,
        private logger: NGXLogger
    ) {}

    //TODO use slider instead of radiobutton

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.idChild = params['idChild'];
            this.logger.debug("idChild:",this.idChild);
        });
        this.route.parent.params.subscribe(params => {
            this.idDayCare=params['idDaycare'];
            this.logger.debug("idDaycare:",this.idDayCare);
        });

        this.sumupService.getOneByChildIdAndDay(this.idDayCare, this.idChild, this.dateService.getCurrentDay()).subscribe(
            (jsonSumup) => {
                this.sumup = jsonSumup;
                this.logger.debug("sumup :",this.sumup);

                this.child=this.sumup.child;

                this.appetite=this.sumup.appetite;
                this.mood=this.sumup.mood;
                this.sleep=this.sumup.sleep;
            },
            (error)=>this.sumupService.errorSubscribe(error),
            this.sumupService.completed('SumupService::getOneByChildIdAndDay')
        );


        this.sumupService.getAllByChildId(this.idDayCare, this.idChild).subscribe(
            (sumups) => {
                this.sumups = sumups;
                this.logger.debug("sumups :", this.sumups);


            },
            (error) => this.sumupService.errorSubscribe(error),
            this.sumupService.completed('SumupService::getOneByChildIdAndDay')
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

    save(){
        if(!(this.sumup.id > 0)){
            this.sumup.id=0;
        }
        this.create();
    }

    create(){
        this.logger.info("create");

        this.sumup.sleep=this.sleep;
        this.sumup.mood=this.mood;
        this.sumup.appetite=this.appetite;

        this.sumupService.create(this.idDayCare,this.idChild,this.sumup).subscribe(
            (jsonSumup) => {
                this.logger.debug("sumup :",jsonSumup);
                this.sumup = jsonSumup;
                this.sumups[this.current] = this.sumup;
            },
            (error)=>this.sumupService.errorSubscribe(error),
            this.sumupService.completed('SumupService::create')
        );
        this.logger.info("EditSumupsComponent::create",this.sumup);
    }

    previous(){
        this.logger.info("EditSumupsComponent::previous");
        if (this.current < this.sumups.length - 1) {
            this.current = this.current + 1;
            this.sumup = this.sumups[this.current];
        }
    }

    next(){
        this.logger.info("EditSumupsComponent::next");
        if (this.current > 0) {
            this.current = this.current - 1;
            this.sumup = this.sumups[this.current];
        }
    }

    hasNext() {
        this.logger.debug("EditSumupsComponent::hasNext", this.current);
        return this.current != 0;
    }

    hasPrevious() {
        this.logger.debug("EditSumupsComponent::hasPrevious", this.current, this.sumups.length - 1, this.current < (this.sumups.length - 1));
        return this.current < (this.sumups.length - 1);
    }
}