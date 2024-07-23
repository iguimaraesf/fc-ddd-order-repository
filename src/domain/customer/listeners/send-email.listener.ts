import { CustomerAddressChangedEvent } from "../event/customer-address-changed.event";
import { CustomerCreatedEvent } from "../event/customer-created.event";

// com uma interface de Generics?
export class CustomerCreatedListener {
    handle(event: CustomerCreatedEvent) {
        console.log("Esse é o primeiro console.log do evento: CustomerCreated")
    }
}

export class CustomerAddressChangedListener {
    handle(event: CustomerAddressChangedEvent) {
        console.log("Esse é o segundo console.log do evento: CustomerAddressChanged")
    }
}
