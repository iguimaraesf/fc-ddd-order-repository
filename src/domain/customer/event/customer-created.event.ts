import { IDomainEvent } from "../../@shared/domain/domain-event.interface";

export class CustomerCreated implements IDomainEvent {
    readonly occurred_on: Date
    readonly event_version: number = 1;

    constructor(
        readonly aggregate_id: string,
        readonly data: any
    ){
        this.occurred_on = new Date();
    }
}
