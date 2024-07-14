import SendEmailWhenProductIsCreatedHandler from "../../product/event/handler/send-email-when-product-is-created.handler";
import ProductCreatedEvent from "../../product/event/product-created.event";
import EventDispacher from "./event-dispatcher";

const NOME_EVENTO = "ProductCreatedEvent";
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
            description: "Descrição do produto 1",
            price: 10,
        })

        // quando for notificado
        // o sendMailWhenProductIsCreatedHandler.handle() deve ser chamado
        const spyEventHandler = jest.spyOn(eventHandler, "handle")
        eventDispatcher.notify(productCreatedEvent)

        expect(spyEventHandler).toHaveBeenCalled()
    })
})