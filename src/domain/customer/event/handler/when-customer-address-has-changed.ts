import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import { CustomerAddressChanged } from "../customer-address-changed.event";

export default class WhenCustomerAddressChanged implements EventHandlerInterface<CustomerAddressChanged> {
    handle(event: CustomerAddressChanged): void {
        console.log("mudou o endereço do cliente: %s.", event.eventData)
    }
}
