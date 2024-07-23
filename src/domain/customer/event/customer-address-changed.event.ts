import EventInterface from "../../@shared/event/event.interface";

export class CustomerAddressChangedEvent implements EventInterface {
    readonly dateTimeOcurred: Date;

    constructor(
        readonly eventData: string
    ){
        this.dateTimeOcurred = new Date();
    }
}
