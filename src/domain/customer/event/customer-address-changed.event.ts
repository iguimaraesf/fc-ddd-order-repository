import { IDomainEvent } from "../../@shared/domain/domain-event.interface";
import EventInterface from "../../@shared/event/event.interface";
import Address from "../value-object/address";

export class CustomerAddressChanged implements EventInterface {
    readonly dateTimeOcurred: Date;

    constructor(
        readonly eventData: string
    ){
        this.dateTimeOcurred = new Date();
    }
}
