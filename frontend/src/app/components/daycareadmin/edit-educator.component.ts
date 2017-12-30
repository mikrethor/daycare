import {Component, NgZone, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {DaycareService} from '../../services/daycare-service';
import {Daycare, Educator} from '../../pojo/pojo';
import {EducatorService} from "../../services/educator-service";


@Component({
    selector: 'admin-edit-educator',
    templateUrl: './edit-educator.html',
})
export class AdminEditEducatorComponent implements OnInit {
    private educator: Educator = Educator.create();
    private educators: Educator[] = [];
    private idDayCare: number = 1;
    private daycare: Daycare = Daycare.create();
    model: any = {};

    constructor(
        private daycareService: DaycareService,
        private educatorService: EducatorService,
        private zone: NgZone,
        private router: Router,
    ) {}

    ngOnInit() {

        this.daycareService.getDaycare(this.idDayCare).subscribe(
            (daycare) => {
                this.daycare = daycare;
            },
            this.daycareService.errorSubscribe,
            this.daycareService.completed

        );


    }

    create() {
        this.educator = new Educator(null, this.model.firstName, this.model.lastName, this.daycare);
        this.educatorService.create(this.idDayCare, this.educator).subscribe(
            data => {
                this.zone.run(() => {
                    this.router.navigate(['daycare', this.idDayCare, 'admin', 1, 'educators']);
                });
            },
            this.educatorService.errorSubscribe,
            this.educatorService.completed);
    }
}