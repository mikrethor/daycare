import {Component, NgZone, OnInit} from '@angular/core';
import {ChildService} from '../../services/child-service';
import {Child, Daycare, Educator} from '../../pojo/pojo';
import {DaycareService} from "../../services/daycare-service";
import {ActivatedRoute} from "@angular/router";
import {NGXLogger} from "ngx-logger";


@Component({
    selector: 'admin-children',
    templateUrl: './child.html',
})
export class AdminChildComponent implements OnInit {
    private educator: Educator = Educator.create();
    private children: Child[] = [];
    private child: Child;
    private idAdmin: number;
    model: any = {};

    private idDayCare: number;
    private daycare: Daycare =  Daycare.create();
    private deleted: boolean = false;

    constructor(
        private childService: ChildService,
        private daycareService: DaycareService,
        private zone: NgZone,
        private route: ActivatedRoute,
        private logger: NGXLogger
    ) { }

    ngOnInit() {
        this.route.parent.params.subscribe(params => {
            this.idDayCare=params['idDaycare'];
            this.logger.debug("idDaycare:",this.idDayCare);
        });
        this.route.params.subscribe(params => {
            this.idAdmin=params['idAdmin'];
        });
        this.logger.debug("idDaycare :",this.idDayCare);
        this.daycareService.getDaycare(this.idDayCare).subscribe(
            (daycare) => {
                this.daycare =daycare;
            },
            (error)=>this.daycareService.errorSubscribe(error),
            ()=>this.daycareService.completed('DaycareService::getDaycare')

        );

        this.childService.getAllByDaycareId(this.idDayCare).subscribe(
            (childs: Array<Child>) => {
                for (let child of childs) {
                    this.children.push(child);
                }
            },
            (error)=>this.childService.errorSubscribe(error),
            ()=>this.daycareService.completed('ChildService::getAllByDaycareId'));
    }

    edit(index: number) {
        //edit
        this.logger.debug("edit : " ,index);
    }

    getChildren() {
        this.children = [];
        this.childService.getAllByDaycareId(this.idDayCare).subscribe(
            (childs: Array<Child>) => {
                for (let child of childs) {
                    this.children.push(child);
                }
            },
            (error)=>this.childService.errorSubscribe(error),
            ()=>this.childService.completed('ChildService::getAllByDaycareId'));
    }

    remove(index: number) {
        this.childService.delete(this.idDayCare, this.children[index].id).subscribe(
            data => {
                this.deleted = (data == true);
                if (this.deleted) {
                    this.zone.run(() => {
                        this.getChildren();
                    });
                }
            },
            (error)=>this.childService.errorSubscribe(error),
            ()=>this.childService.completed('ChildService::delete'));
    }


}