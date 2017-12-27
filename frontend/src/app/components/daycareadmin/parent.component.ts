import {Component, NgZone, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {DaycareService} from '../../services/daycare-service';
import {Daycare, Parent} from '../../pojo/pojo';
import {ParentService} from "../../services/parent-service";


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

    constructor(
        private service: DaycareService,
        private parentService: ParentService,
        private zone: NgZone,
        private router: Router,
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
        this.parentService.getAllByDaycareId(this.idDayCare).subscribe(
            (jsonParent) => {
                for (let parent of jsonParent) {
                    console.log(parent)
                    this.parents.push(new Parent(parent.id, parent.firstName, parent.lastName, parent.daycare));

                }
            },
            this.parentService.errorSubscribe,
            this.parentService.completed
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
        this.parentService.delete(this.idDayCare, this.parents[index].id).subscribe(
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