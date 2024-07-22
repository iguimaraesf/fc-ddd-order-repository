import { IDomainEvent } from "../../../@shared/domain/domain-event.interface";
import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import { CustomerNameChanged } from "../customer-name-changed.event";

export default class WhenCustomerNameChanged implements EventHandlerInterface<CustomerNameChanged> {
    handle(event: CustomerNameChanged): void {
        console.log("Nome do cliente mudou: %s.", event.eventData)
    }
}
