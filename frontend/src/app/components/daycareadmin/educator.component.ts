import { Component, Output, OnInit, OnChanges, SimpleChanges, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../../services/login-service';
import { Observable, Subscription } from 'rxjs/Rx';
import { DaycareService, Educator, Child, Daycare } from '../../services/daycare-service';


@Component({
    selector: 'admin-educator',
    templateUrl: './educator.html',
})
export class AdminEducatorComponent implements OnInit, OnChanges {
    private educator: Educator = new Educator(0, "", "", 0);
    private educators: Educator[] = [];
    private idDayCare: number = 1;
    private daycare: Daycare = new Daycare(0, "");
    private deleted: boolean = false;
    model: any = {};

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

        this.getEducators();
    }

    getEducators() {
        this.educators = [];
        this.service.getEducators(this.idDayCare).subscribe(
            (jsonEducator) => {
                for (let educator of jsonEducator) {
                    this.educators.push(new Educator(educator.id, educator.firstName, educator.lastName, educator.daycare));

                }
            },
            this.service.errorSubscribe,
            this.service.completed
        );
    }

    remove(index: number) {
        this.service.deleteEducator(this.idDayCare, this.educators[index].id).subscribe(
            data => {
                this.deleted = (data == true);
                if (this.deleted) {
                    this.zone.run(() => {
                        this.getEducators();
                    });
                }
            },
            this.service.errorSubscribe,
            this.service.completed);
    }


     edit(index: number) {
      //edit
      console.log("edit : "+index);
    }

    // create() {
    //     this.educator = new Educator(null, this.model.firstName, this.model.lastName, this.idDayCare);
    //     this.service.createEducator(this.idDayCare, this.educator).subscribe(
    //         data => {
    //             this.zone.run(() => {
    //                 this.getEducators();
    //             });
    //         },
    //         this.service.errorSubscribe,
    //         this.service.completed);
    // }

    ngOnChanges(changes: SimpleChanges) {
        this.getEducators();
    }

    
}