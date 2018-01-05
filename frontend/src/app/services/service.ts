import 'rxjs/Rx';
import {NGXLogger} from "ngx-logger";

export class ServiceImpl implements Service{

    constructor(
        protected logger: NGXLogger,
    ) {}

    errorSubscribe(error) {   this.logger.error("Error happened : ", error); }
    completed(description) {
        this.logger.debug(description,"completed");
    }
}

export abstract class Service {
    abstract errorSubscribe(error);
    abstract completed(description);
}