import { IDomainEvent } from "../../@shared/domain/domain-event.interface";
import { CustomerAddressChanged } from "../event/customer-address-changed.event";
import { CustomerCreated } from "../event/customer-created.event";

// com uma interface de Generics?
export class CustomerCreatedListener {
    handle(event: CustomerCreated) {
        console.log("Esse é o primeiro console.log do evento: CustomerCreated", formatarEvento(event))
    }
}

export class CustomerAddressChangedListener {
    handle(event: CustomerAddressChanged) {
        console.log("Esse é o segundo console.log do evento: CustomerAddressChanged", formatarEvento(event))
    }
}

function formatarEvento(e: IDomainEvent): string {
    return `id=${e.aggregate_id}; dados=${e.data}; conteúdo=${e}`
}