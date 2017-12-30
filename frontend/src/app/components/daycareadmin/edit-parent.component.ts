import {Component, NgZone, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {DaycareService} from '../../services/daycare-service';
import {Daycare, Parent} from '../../pojo/pojo';
import {ParentService} from "../../services/parent-service";


@Component({
    selector: 'admin-edit-parent',
    templateUrl: './edit-parent.html',
})
export class AdminEditParentComponent implements OnInit {
    private parent: Parent = Parent.create();
    private parents: Parent[] = [];
    private idDayCare: number = 1;
    private daycare: Daycare = Daycare.create();
    model: any = {};

    constructor(
        private daycareService: DaycareService,
        private parentService: ParentService,
        private zone: NgZone,
        private router: Router,
    ) { }

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
        this.parent = new Parent(null, this.model.firstName, this.model.lastName, this.daycare);
        this.parentService.create(this.idDayCare, this.parent).subscribe(
            data => {
                this.zone.run(() => {
                    this.router.navigate(['daycare', this.idDayCare, 'admin', 1, 'parents']);
                });
            },
            this.parentService.errorSubscribe,
            this.parentService.completed);
    }
}