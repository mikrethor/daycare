import { Component, Output, OnInit, SimpleChanges, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../../services/login-service';
import { Observable, Subscription } from 'rxjs/Rx';
import { DaycareService, Educator, Child, Daycare } from '../../services/daycare-service';


@Component({
    selector: 'admin-edit-educator',
    templateUrl: './edit-educator.html',
})
export class AdminEditEducatorComponent implements OnInit {
    private educator: Educator = new Educator(0, "", "", 0);
    private educators: Educator[] = [];
    private idDayCare: number = 1;
    private daycare: Daycare = new Daycare(0, "");
    private deleted: boolean = false;
    model: any = {};

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


    }

    create() {
        this.educator = new Educator(null, this.model.firstName, this.model.lastName, this.idDayCare);
        this.service.createEducator(this.idDayCare, this.educator).subscribe(
            data => {
                this.zone.run(() => {
                    this.router.navigate(['daycare', this.idDayCare, 'admin', 1, 'educators']);
                });
            },
            this.service.errorSubscribe,
            this.service.completed);
    }
}