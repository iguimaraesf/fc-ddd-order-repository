import EventDispacherFactory from "../../@shared/event/event-dispatcher.factory"
import CustomerFactory from "../factory/customer.factory"
import Address from "../value-object/address"

describe("acionamento de eventos de domínio para a mudança do endereço do cliente", () => {
    it("deve disparar o evento de mudança de endereço do cliente", () => {
        console.log("****** mudança de endereço *********")
        const dispatcher = EventDispacherFactory.create()
        const exp = dispatcher.getHandlers("CustomerAddressChangedEvent")
        expect(exp).toBeDefined()
        const fn = jest.spyOn(exp[0], "handle")
        const entidade = CustomerFactory.newInstance("1", "Maria")
        const addr = new Address("Rua teste", 1, "São Paulo", "01001-000")
        entidade.changeAddress(addr)
        dispatcher.notifyAll(entidade)
        expect(fn).toHaveBeenCalled()
    })

    it("não deve disparar o evento de mudança de endereço do cliente", () => {
        const dispatcher = EventDispacherFactory.create()
        const exp = dispatcher.getHandlers("CustomerAddressChangedEvent")
        expect(exp).toBeDefined()
        const fn = jest.spyOn(exp[0], "handle")
        const addr = new Address("Rua teste", 1, "São Paulo", "01001-000")
        const entidade = CustomerFactory.newInstanceWithAddress("1", "Eduarda", addr)
        entidade.changeAddress(addr)
        dispatcher.notifyAll(entidade)
        expect(fn).toHaveBeenCalledTimes(0)
    })
})
