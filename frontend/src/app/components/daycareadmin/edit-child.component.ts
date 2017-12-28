import {Component, NgZone, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {DaycareService} from '../../services/daycare-service';
import {Child, Daycare} from '../../pojo/pojo';
import {ChildService} from "../../services/child-service";


@Component({
    selector: 'admin-edit-child',
    templateUrl: './edit-child.html',
})
export class AdminEditChildComponent implements OnInit {
    private child: Child = new Child(0, "", "", new Daycare(1,""));
    private children: Child[] = [];
    private idDayCare: number = 1;
    private daycare: Daycare = new Daycare(0, "");
    private deleted: boolean = false;
    model: any = {};

    constructor(
        private daycareService: DaycareService,
        private childService: ChildService,
        private zone: NgZone,
        private router: Router,
    ) { }

    ngOnInit() {

        this.daycareService.getDaycare(this.idDayCare).subscribe(
            (json) => {
                this.daycare = new Daycare(json.id, json.name);
            },
            this.daycareService.errorSubscribe,
            this.daycareService.completed

        );
    }

    create() {
        this.child = new Child(null, this.model.firstname, this.model.lastname, this.daycare);
        this.childService.create(this.idDayCare, this.child).subscribe(
            data => {
                this.zone.run(() => {
                    this.router.navigate(['daycare', this.idDayCare, 'admin', 1, 'children']);
                });
            },
            this.childService.errorSubscribe,
            this.childService.completed);
    }
}