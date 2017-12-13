import { Component, Output, OnInit, SimpleChanges, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../../services/login-service';
import { Observable, Subscription } from 'rxjs/Rx';
import { DaycareService} from '../../services/daycare-service';
import { Daycare,Parent } from '../../pojo/pojo';


@Component({
    selector: 'admin-edit-parent',
    templateUrl: './edit-parent.html',
})
export class AdminEditParentComponent implements OnInit {
    private parent: Parent = new Parent(0, "", "", 0);
    private parents: Parent[] = [];
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
        this.parent = new Parent(null, this.model.firstName, this.model.lastName, this.idDayCare);
        this.service.createParent(this.idDayCare, this.parent).subscribe(
            data => {
                this.zone.run(() => {
                    this.router.navigate(['daycare', this.idDayCare, 'admin', 1, 'parents']);
                });
            },
            this.service.errorSubscribe,
            this.service.completed);
    }
}