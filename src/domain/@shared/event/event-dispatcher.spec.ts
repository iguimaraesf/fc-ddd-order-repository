import { CustomerAddressChangedEvent } from "../../customer/event/customer-address-changed.event";
import { CustomerCreatedEvent } from "../../customer/event/customer-created.event";
import { CustomerNameChangedEvent } from "../../customer/event/customer-name-changed.event";
import WhenCustomerAddressChanged from "../../customer/event/handler/when-customer-address-has-changed";
import WhenCustomerIsCreated from "../../customer/event/handler/when-customer-is-created";
import WhenCustomerNameChanged from "../../customer/event/handler/when-customer-name-has-changed";
import SendEmailWhenProductIsCreatedHandler from "../../product/event/handler/send-email-when-product-is-created.handler";
import ProductCreatedEvent from "../../product/event/product-created.event";
import EventDispacher from "./event-dispatcher";
import EventHandlerInterface from "./event-handler.interface";
import EventInterface from "./event.interface";

const NOME_EVENTO = "ProductCreatedEvent";
class TestEvent {
    constructor(readonly name: string,
        readonly handler: EventHandlerInterface,
        readonly event: EventInterface) {
    }
    
}

describe("Testes dos eventos de dominio", () => {
    it("deve anexar um manipulador evento", () => {
        const eventDispatcher = new EventDispacher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();
        eventDispatcher.register(NOME_EVENTO, eventHandler)

        const res = eventDispatcher.getEventHandlers[NOME_EVENTO]

        expect(res).toBeDefined()
        expect(res.length).toBe(1)
        expect(res[0]).toMatchObject(eventHandler)
    })

    it("deve desanexar um manupulador de evento", () => {
        const eventDispatcher = new EventDispacher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();
        eventDispatcher.register(NOME_EVENTO, eventHandler)
        const res0 = eventDispatcher.getEventHandlers[NOME_EVENTO]
        expect(res0[0]).toMatchObject(eventHandler)

        eventDispatcher.unregister(NOME_EVENTO, eventHandler)
        const res1 = eventDispatcher.getEventHandlers[NOME_EVENTO]
        expect(res1).toBeDefined()
        expect(res1.length).toBe(0)
    })

    it("deve desanexar todos os eventos", () => {
        const eventDispatcher = new EventDispacher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();
        eventDispatcher.register(NOME_EVENTO, eventHandler)
        const res0 = eventDispatcher.getEventHandlers[NOME_EVENTO]
        expect(res0[0]).toMatchObject(eventHandler)

        eventDispatcher.unregisterAll()
        const res1 = eventDispatcher.getEventHandlers[NOME_EVENTO]
        expect(res1).toBeUndefined()
    })

    it("deve notificar todos os manipuladores de evento", () => {
        const eventDispatcher = new EventDispacher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler()

        eventDispatcher.register(NOME_EVENTO, eventHandler)
        const res0 = eventDispatcher.getEventHandlers[NOME_EVENTO]
        expect(res0[0]).toMatchObject(eventHandler)

        const productCreatedEvent = new ProductCreatedEvent({
            name: "Produto 1",
            id: "123",
            price: 10,
        })

        // quando for notificado
        // o sendMailWhenProductIsCreatedHandler.handle() deve ser chamado
        const spyEventHandler = jest.spyOn(eventHandler, "handle")
        eventDispatcher.notify(productCreatedEvent)

        expect(spyEventHandler).toHaveBeenCalled()
    })

    it("deve notificar os manipuladores de evento de mudança de endereço", () => {
        const eventDispatcher = new EventDispacher();
        const eventHandler = new WhenCustomerAddressChanged()
        const umEvento = new CustomerAddressChangedEvent("Avenida Atlântica, 4000")
        const nomeEvento: string = umEvento.constructor.name

        eventDispatcher.register(nomeEvento, eventHandler)
        const res0 = eventDispatcher.getEventHandlers[nomeEvento]
        expect(res0[0]).toMatchObject(eventHandler)

        // quando for notificado
        const spyEventHandler = jest.spyOn(eventHandler, "handle")
        eventDispatcher.notify(umEvento)

        expect(spyEventHandler).toHaveBeenCalled()
    })

    it("deve notificar os manipuladores de evento de criação de um novo cliente", () => {
        const eventDispatcher = new EventDispacher();
        const eventHandler = new WhenCustomerIsCreated()
        const umEvento = new CustomerCreatedEvent({
            customerId: "12345",
            customerName: "Seu Zé"
        })
        const nomeEvento: string = umEvento.constructor.name

        eventDispatcher.register(nomeEvento, eventHandler)
        const res0 = eventDispatcher.getEventHandlers[nomeEvento]
        expect(res0[0]).toMatchObject(eventHandler)

        // quando for notificado
        const spyEventHandler = jest.spyOn(eventHandler, "handle")
        eventDispatcher.notify(umEvento)

        expect(spyEventHandler).toHaveBeenCalled()
    })

    it("deve notificar os manipuladores de evento de alteração do nome do cliente", () => {
        const eventDispatcher = new EventDispacher();
        const eventHandler = new WhenCustomerNameChanged()
        const umEvento = new CustomerNameChangedEvent("João da Silva Sauro")
        const nomeEvento: string = umEvento.constructor.name

        eventDispatcher.register(nomeEvento, eventHandler)
        const res0 = eventDispatcher.getEventHandlers[nomeEvento]
        expect(res0[0]).toMatchObject(eventHandler)

        // quando for notificado
        const spyEventHandler = jest.spyOn(eventHandler, "handle")
        eventDispatcher.notify(umEvento)

        expect(spyEventHandler).toHaveBeenCalled()
    })

    it("deve notificar todos os manipuladores de todos os eventos", () => {
        const eventDispatcher = new EventDispacher();
        const eventHandlers: TestEvent[] = [
            new TestEvent("ProductCreatedEvent", new SendEmailWhenProductIsCreatedHandler(), new ProductCreatedEvent({
                name: "Produto 1",
                id: "999",
                price: 10,
            })),
            new TestEvent("CustomerAddressChangedEvent", new WhenCustomerAddressChanged(), new CustomerAddressChangedEvent("Rua das Oliveiras")),
            new TestEvent("CustomerCreatedEvent", new WhenCustomerIsCreated(), new CustomerCreatedEvent({customerId: "9", customerName: "Aaa"})),
            new TestEvent("CustomerNameChangedEvent", new WhenCustomerNameChanged(), new CustomerNameChangedEvent("João")),
        ]
        eventHandlers.forEach(e => {
            eventDispatcher.register(e.name, e.handler)
            const spyEventHandler = jest.spyOn(e.handler, "handle")
            console.log(`Notificando o evento ${e.event.constructor.name}.`)
            eventDispatcher.notify(e.event)
            expect(spyEventHandler).toHaveBeenCalled()
        })
    })
})
