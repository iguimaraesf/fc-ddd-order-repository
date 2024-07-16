import { IDomainEvent } from "../../@shared/domain/domain-event.interface";
import Address from "../value-object/address";

export class CustomerAddressChanged implements IDomainEvent {
    readonly occurred_on: Date
    readonly event_version: number = 1;

    constructor(
        readonly aggregate_id: string,
        readonly data: any
    ){
        this.occurred_on = new Date();
    }
}
