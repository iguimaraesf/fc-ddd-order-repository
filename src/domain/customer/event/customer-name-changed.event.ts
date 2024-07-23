import EventInterface from "../../@shared/event/event.interface";

export class CustomerNameChangedEvent implements EventInterface {
    readonly dateTimeOcurred: Date

    constructor(
        readonly eventData: string
    ){
        this.dateTimeOcurred = new Date();
    }
}