import {Component, NgZone, OnInit} from '@angular/core';
import {ChildService} from '../../services/child-service';
import {Child, Daycare, Educator} from '../../pojo/pojo';
import {DaycareService} from "../../services/daycare-service";


@Component({
    selector: 'admin-children',
    templateUrl: './child.html',
})
export class AdminChildComponent implements OnInit {
    private educator: Educator = new Educator(0, "", "", 0);
    private children: Child[] = [];
    private child: Child;
    model: any = {};

    private idDayCare: number = 1;
    private daycare: Daycare = new Daycare(0, "");
    private deleted: boolean = false;

    constructor(
        private childService: ChildService,
        private daycareService: DaycareService,
        private zone: NgZone
    ) { }

    ngOnInit() {
        this.daycareService.getDaycare(this.idDayCare).subscribe(
            (json) => {
                this.daycare = new Daycare(json.id, json.name);
            },
            this.childService.errorSubscribe,
            this.childService.completed

        );

        this.childService.getAllByDaycareId(this.idDayCare).subscribe(
            (childs: Array<Child>) => {
                for (let child of childs) {
                    this.children.push(new Child(child.id, child.firstname, child.lastname, new Daycare(1,"")));
                }
            },
            this.childService.errorSubscribe,
            this.childService.completed);
    }

    edit(index: number) {
        //edit
        console.log("edit : " + index);
    }

    getChildren() {
        this.children = [];
        this.childService.getAllByDaycareId(this.idDayCare).subscribe(
            (childs: Array<Child>) => {
                for (let child of childs) {
                    this.children.push(new Child(child.id, child.firstname, child.lastname, new Daycare(1,"")));
                }
            },
            this.childService.errorSubscribe,
            this.childService.completed);
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
            this.childService.errorSubscribe,
            this.childService.completed);
    }


}