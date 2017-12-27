import {Component, NgZone, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {DaycareService} from '../../services/daycare-service';
import {Daycare, Educator} from '../../pojo/pojo';
import {EducatorService} from "../../services/educator-service";


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

    constructor(
        private daycareService: DaycareService,
        private educatorService: EducatorService,
        private zone: NgZone
    ) {}

    ngOnInit() {

        this.daycareService.getDaycare(this.idDayCare).subscribe(
            (json) => {
                this.daycare = new Daycare(json.id, json.name);
            },
            this.daycareService.errorSubscribe,
            this.daycareService.completed

        );

        this.getEducators();
    }

    getEducators() {
        this.educators = [];
        this.educatorService.getAllByDaycareId(this.idDayCare).subscribe(
            (jsonEducator) => {
                for (let educator of jsonEducator) {
                    this.educators.push(new Educator(educator.id, educator.firstName, educator.lastName, educator.daycare));

                }
            },
            this.educatorService.errorSubscribe,
            this.educatorService.completed
        );
    }

    remove(index: number) {
        this.educatorService.delete(this.idDayCare, this.educators[index].id).subscribe(
            data => {
                this.deleted = (data == true);
                if (this.deleted) {
                    this.zone.run(() => {
                        this.getEducators();
                    });
                }
            },
            this.daycareService.errorSubscribe,
            this.daycareService.completed);
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