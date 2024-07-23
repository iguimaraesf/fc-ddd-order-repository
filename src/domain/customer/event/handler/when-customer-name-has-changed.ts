import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import { CustomerNameChangedEvent } from "../customer-name-changed.event";

export default class WhenCustomerNameChanged implements EventHandlerInterface<CustomerNameChangedEvent> {
    handle(event: CustomerNameChangedEvent): void {
        console.log("Nome do cliente mudou: %s.", event.eventData)
    }
}
