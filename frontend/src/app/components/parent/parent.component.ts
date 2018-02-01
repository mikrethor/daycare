import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Child, Parent, Sumups, User} from '../../pojo/pojo';
import {SumupService} from "../../services/sumup-service";
import {ParentService} from "../../services/parent-service";
import {ChildService} from "../../services/child-service";
import {DateService} from "../../services/date-service";
import {NGXLogger} from "ngx-logger";


@Component({
    selector: 'parent',
    templateUrl: './parent.html',
})
export class ParentComponent implements OnInit {
    user: User;
    parent: Parent = Parent.create();
    children: Child[] = [];
    child = {
        selectedMoodId: 0,
        selectedSleepId: 0,
        selectedAppetiteId: 0
    };
    sumup: Sumups = Sumups.create();
    idDayCare: number = -61;
    idParent: number = -61;

    constructor(
        private sumupService: SumupService,
        private parentService: ParentService,
        private childService: ChildService,
        private dateService: DateService,
        private route: ActivatedRoute,
        private logger: NGXLogger
    ) {}

    ngOnInit() {
        this.user = User.create();

        this.route.parent.params.subscribe(params => {
            this.idDayCare=params['idDaycare'];
            this.logger.debug("idDaycare:",this.idDayCare);
        });

        this.idParent = this.route.snapshot.params['idParent'];

        this.parentService.getOneById(this.idDayCare, this.idParent).subscribe(
            (jsonParent) => {
                this.parent = jsonParent;
            },
            (error)=>this.parentService.errorSubscribe(error),
            this.parentService.completed('ParentService::getOneById')
        );

        this.childService.getAllByParentId(this.idDayCare, this.idParent).subscribe(
            (children) => {
                for (let child of children) {
                    this.children.push(child);
                }
            },
            (error)=>this.childService.errorSubscribe(error),
            this.childService.completed('ParentService::getAllByParentId')
        );

        this.logger.debug("Children length :", this.children.length);

        if(this.children.length>0){

            let idCurrentChild=this.children[0].id;
            this.sumupService.getOneByChildIdAndDay(this.idDayCare, idCurrentChild, this.dateService.getCurrentDay()).subscribe(
                (jsonSumup) => {
                    this.logger.debug(jsonSumup);
                    this.sumup = jsonSumup;
                    this.child = {
                        selectedMoodId: this.sumup.mood,
                        selectedSleepId: this.sumup.sleep,
                        selectedAppetiteId: this.sumup.appetite
                    }
                },
                (error)=>this.sumupService.errorSubscribe(error),
                this.sumupService.completed('SumupService::getOneByChildIdAndDay')
            );
        }

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
//TODO move getsumuphere
    }


}