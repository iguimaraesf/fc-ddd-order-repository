import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import { CustomerAddressChangedEvent } from "../customer-address-changed.event";

export default class WhenCustomerAddressChanged implements EventHandlerInterface<CustomerAddressChangedEvent> {
    handle(event: CustomerAddressChangedEvent): void {
        console.log("foi feita uma alteração no endereço do cliente: %s.", event.eventData)
    }
}
