import WhenCustomerAddressChanged from "../../customer/event/handler/when-customer-address-has-changed";
import WhenCustomerIsCreated from "../../customer/event/handler/when-customer-is-created";
import WhenCustomerNameChanged from "../../customer/event/handler/when-customer-name-has-changed";
import SendEmailWhenProductIsCreatedHandler from "../../product/event/handler/send-email-when-product-is-created.handler";
import EventDispacher from "./event-dispatcher";
import EventDispatcherInterface from "./event-dispatcher.interface";

export default class EventDispacherFactory {
    private constructor() {}

    static create(): EventDispatcherInterface {
        const dispatcher = new EventDispacher()
        dispatcher.register("ProductCreatedEvent", new SendEmailWhenProductIsCreatedHandler())
        dispatcher.register("CustomerAddressChangedEvent", new WhenCustomerAddressChanged())
        dispatcher.register("CustomerCreatedEvent", new WhenCustomerIsCreated())
        dispatcher.register("CustomerNameChangedEvent", new WhenCustomerNameChanged())
        return dispatcher
    }
}