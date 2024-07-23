import EventDispacherFactory from "../../@shared/event/event-dispatcher.factory"
import CustomerFactory from "../factory/customer.factory"

describe("acionamento de eventos de domínio para a mudança do nome do cliente", () => {
    it("deve disparar o evento de mudança de nome do cliente", () => {
        console.log("****** mudança de nome *********")
        const dispatcher = EventDispacherFactory.create()
        const exp = dispatcher.getHandlers("CustomerNameChangedEvent")
        expect(exp).toBeDefined()
        const fn = jest.spyOn(exp[0], "handle")
        const entidade = CustomerFactory.newInstance("1", "Valdemar")
        entidade.changeName("Valéria")
        dispatcher.notifyAll(entidade)
        expect(fn).toHaveBeenCalled()
    })

    it("não deve disparar o evento de mudança de nome do cliente", () => {
        const dispatcher = EventDispacherFactory.create()
        const exp = dispatcher.getHandlers("CustomerNameChangedEvent")
        expect(exp).toBeDefined()
        const fn = jest.spyOn(exp[0], "handle")
        const entidade = CustomerFactory.newInstance("1", "Helena")
        entidade.changeName("Helena")
        dispatcher.notifyAll(entidade)
        expect(fn).toHaveBeenCalledTimes(0)
    })
})