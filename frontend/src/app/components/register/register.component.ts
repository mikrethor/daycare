import {Component, OnInit} from "@angular/core";
import {DaycareService} from "../../services/daycare-service";
import {NGXLogger} from "ngx-logger";
import {UserService} from "../../services/user-service";

@Component({
    selector: 'register',
    templateUrl: './register.html',
})
export class RegisterComponent implements OnInit {
    private username = "";
    private firstname = "";
    private lastname = "";

    //TODO search daycare by name

    constructor(private daycareService: DaycareService,
                private userService: UserService,
                private logger: NGXLogger) {
    }


    ngOnInit() {

    }

    save() {
        this.logger.info("RegisterComponent::save");
        this.logger.info("Email", this.username);
        this.logger.info("Firstname", this.firstname);
        this.logger.info("Lastname", this.lastname);
    }
}