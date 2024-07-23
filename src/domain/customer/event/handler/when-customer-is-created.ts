import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import { CustomerCreatedEvent } from "../customer-created.event";

export default class WhenCustomerIsCreated implements EventHandlerInterface<CustomerCreatedEvent> {
    handle(event: CustomerCreatedEvent): void {
        console.log("cliente criado: %s / %s.", event.eventData.customerId, event.eventData.customerName)
    }
}
