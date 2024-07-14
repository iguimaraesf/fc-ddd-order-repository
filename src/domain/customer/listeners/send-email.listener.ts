import { CustomerCreated } from "../entity/customer-created.event";

// com uma interface de Generics?
export class SendMailListener {
    handle(event: CustomerCreated){
        //envio do email
        console.log("envio de email para cliente criado", event.name, event.occurred_on)
    }
}
