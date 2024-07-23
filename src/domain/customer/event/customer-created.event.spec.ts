import EventDispacherFactory from "../../@shared/event/event-dispatcher.factory"
import CustomerFactory from "../factory/customer.factory"

describe("acionamento de eventos de domínio para a criação de cliente", () => {
    it("deve disparar o evento de criação de cliente", () => {
        console.log("****** criação cliente *********")
        const dispatcher = EventDispacherFactory.create()
        const exp = dispatcher.getHandlers("CustomerCreatedEvent")
        expect(exp).toBeDefined()
        const fn = jest.spyOn(exp[0], "handle")
        const entidade = CustomerFactory.create("Zeca")
        dispatcher.notifyAll(entidade)
        expect(fn).toHaveBeenCalled()
    })

    it("não deve disparar o evento de criação do cliente", () => {
        const dispatcher = EventDispacherFactory.create()
        const exp = dispatcher.getHandlers("CustomerCreatedEvent")
        expect(exp).toBeDefined()
        const fn = jest.spyOn(exp[0], "handle")
        const entidade = CustomerFactory.newInstance("123", "Nome X")
        dispatcher.notifyAll(entidade)
        expect(fn).toHaveBeenCalledTimes(0)
    })
})