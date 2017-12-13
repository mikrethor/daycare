import { Component, Output, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../../services/login-service';
import { Observable, Subscription } from 'rxjs/Rx';
import { DaycareService } from '../../services/daycare-service';
import { Educator, Child, Daycare } from '../../pojo/pojo';


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




    constructor(private service: DaycareService, private zone: NgZone
    ) { }

    ngOnInit() {
        this.service.getDaycare(this.idDayCare).subscribe(
            (json) => {
                this.daycare = new Daycare(json.id, json.name);
            },
            this.service.errorSubscribe,
            this.service.completed

        );

        this.service.getChildren(this.idDayCare)
            .subscribe(
            (json) => {
                for (let child of json) {
                    this.children.push(new Child(child.id, child.firstName, child.lastName, child.daycare));
                }
            },
            this.service.errorSubscribe,
            this.service.completed);
    }

    // create() {
    //     this.child = new Child(null, this.model.firstName, this.model.lastName, this.idDayCare);
    //     this.service.createChild(this.idDayCare, this.child).subscribe(
    //         data => {
    //             console.log(data);
    //         },
    //         this.service.errorSubscribe,
    //         this.service.completed);
    // }

    edit(index: number) {
        //edit
        console.log("edit : " + index);
    }

    getChildren() {
        this.children = [];
        this.service.getChildren(this.idDayCare).subscribe(
            (jsonChild) => {
                for (let child of jsonChild) {
                    this.children.push(new Child(child.id, child.firstName, child.lastName, child.daycare));

                }
            },
            this.service.errorSubscribe,
            this.service.completed
        );
    }

    remove(index: number) {
        this.service.deleteChild(this.idDayCare, this.children[index].id).subscribe(
            data => {
                this.deleted = (data == true);
                if (this.deleted) {
                    this.zone.run(() => {
                        this.getChildren();
                    });
                }
            },
            this.service.errorSubscribe,
            this.service.completed);
    }


}