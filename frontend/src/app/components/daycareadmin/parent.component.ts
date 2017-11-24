import { Component, Output, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../../services/login-service';
import { Observable, Subscription } from 'rxjs/Rx';
import { DaycareService, Parent, Daycare } from '../../services/daycare-service';


@Component({
    selector: 'admin-parent',
    templateUrl: './parent.html',
})
export class AdminParentComponent implements OnInit {
    private idDayCare: number = 1;
    private parents: Parent[] = [];
    private daycare: Daycare = new Daycare(0, "");
    private parent: Parent;
    model: any = {};
    private deleted: boolean = false;

    constructor(private service: DaycareService, private zone: NgZone, private router: Router,
    ) { }

    ngOnInit() {

        this.service.getDaycare(this.idDayCare).subscribe(
            (json) => {
                this.daycare = new Daycare(json.id, json.name);
            },
            this.service.errorSubscribe,
            this.service.completed

        );

        this.getParents();
    }

    getParents() {
        this.parents = [];
        this.service.getParents(this.idDayCare).subscribe(
            (jsonParent) => {
                for (let parent of jsonParent) {
                    this.parents.push(new Parent(parent.id, parent.firstName, parent.lastName, parent.daycare));

                }
            },
            this.service.errorSubscribe,
            this.service.completed
        );
    }

    // create() {
    //     this.parent = new Parent(null, this.model.firstName, this.model.lastName, this.idDayCare);
    //     this.service.createParent(this.idDayCare, this.parent).subscribe(
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

    remove(index: number) {
        this.service.deleteParent(this.idDayCare, this.parents[index].id).subscribe(
            data => {
                this.deleted = (data == true);
                if (this.deleted) {
                    this.zone.run(() => {
                        this.getParents();
                    });
                }
            },
            this.service.errorSubscribe,
            this.service.completed);
    }


}