import { IDomainEvent } from "../../@shared/domain/domain-event.interface";
import EventInterface from "../../@shared/event/event.interface";
import Customer from "../entity/customer";

export class CustomerCreated implements EventInterface {
    readonly dateTimeOcurred: Date
    readonly event_version: number = 1;

    constructor(
        readonly eventData: Customer
    ){
        this.dateTimeOcurred = new Date();
    }
}
