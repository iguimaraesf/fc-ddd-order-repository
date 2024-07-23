import EventInterface from "../../@shared/event/event.interface";
import Customer from "../entity/customer";

export class CustomerCreated implements EventInterface {
    readonly dateTimeOcurred: Date
    readonly event_version: number = 1;

    constructor(
        readonly eventData: CustomerCreatedProps
    ){
        this.dateTimeOcurred = new Date();
    }
}


export class CustomerCreatedProps {
    constructor(
        readonly customerId: string,
        readonly customerName: string
    ) {}
}