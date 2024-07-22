import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import { CustomerCreated } from "../customer-created.event";

export default class WhenCustomerIsCreated implements EventHandlerInterface<CustomerCreated> {
    handle(event: CustomerCreated): void {
        console.log("cliente criado: %s / %s.", event.eventData.id, event.eventData.name)
    }
}
