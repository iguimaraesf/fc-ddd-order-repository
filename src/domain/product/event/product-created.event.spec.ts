import EventDispacherFactory from "../../@shared/event/event-dispatcher.factory";
import ProductFactory from "../factory/product.factory";

describe("acionamento de eventos de domínio para a criação de um novo produto", () => {
    it("deve disparar o evento de criação do produto A", () => {
        console.log("****** criação de produto A *********")
        const dispatcher = EventDispacherFactory.create()
        const exp = dispatcher.getHandlers("ProductCreatedEvent")
        expect(exp).toBeDefined()
        const fn = jest.spyOn(exp[0], "handle")
        const entidade = ProductFactory.create("a", "Prod A", 44.90)
        dispatcher.notifyAll(entidade)
        expect(fn).toHaveBeenCalled()
    })

    it("deve disparar o evento de criação do produto B", () => {
        const dispatcher = EventDispacherFactory.create()
        const exp = dispatcher.getHandlers("ProductCreatedEvent")
        expect(exp).toBeDefined()
        const fn = jest.spyOn(exp[0], "handle")
        const entidade = ProductFactory.create("b", "Prod B", 1.99)
        dispatcher.notifyAll(entidade)
        expect(fn).toHaveBeenCalled()
    })

    it("não deve disparar o evento de criação do produto", () => {
        const dispatcher = EventDispacherFactory.create()
        const exp = dispatcher.getHandlers("ProductCreatedEvent")
        expect(exp).toBeDefined()
        const fn = jest.spyOn(exp[0], "handle")
        const entidade = ProductFactory.newInstance("b", "123", "Prod B-carregado", 1.99)
        dispatcher.notifyAll(entidade)
        expect(fn).toHaveBeenCalledTimes(0)
    })
})
