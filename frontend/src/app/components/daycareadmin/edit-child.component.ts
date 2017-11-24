import { Component, Output, OnInit, SimpleChanges, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../../services/login-service';
import { Observable, Subscription } from 'rxjs/Rx';
import { DaycareService, Educator, Child, Daycare } from '../../services/daycare-service';


@Component({
    selector: 'admin-edit-child',
    templateUrl: './edit-child.html',
})
export class AdminEditChildComponent implements OnInit {
    private child: Child = new Child(0, "", "", 0);
    private children: Child[] = [];
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
        this.child = new Child(null, this.model.firstName, this.model.lastName, this.idDayCare);
        this.service.createChild(this.idDayCare, this.child).subscribe(
            data => {
                this.zone.run(() => {
                    this.router.navigate(['daycare', this.idDayCare, 'admin', 1, 'children']);
                });
            },
            this.service.errorSubscribe,
            this.service.completed);
    }
}