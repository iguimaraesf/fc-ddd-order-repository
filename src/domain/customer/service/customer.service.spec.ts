import { Sequelize } from "sequelize-typescript"
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model"
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository"
import CustomerService from "./customer.service"
import { Mediator } from "../../@shared/service/mediator"
import Address from "../value-object/address"
import Customer from "../entity/customer"

describe("testes unitários do serviço de clientes (customers)", () => {
    let sequelize: Sequelize
    let repository: CustomerRepository
    let mediator: Mediator
    let service: CustomerService
    let testAddress: Address

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        })
        sequelize.addModels([CustomerModel])
        await sequelize.sync()
        repository = new CustomerRepository()
        mediator = new Mediator()
        service = new CustomerService(repository, mediator)
        testAddress = new Address("Street abc", 1010, "69999", "Niverland")
    })


    afterEach(async() => {
        await sequelize.close()
    })

    it("não deve chamar nenhum evento porque muda para o mesmo endereço", async () => {
        const addressChanged = jest.spyOn(service.addressChangedListener, "handle")
        const created = jest.spyOn(service.createdListener, "handle")
        const res = Customer.new("123", "c1")
        res.defineAddress(testAddress)

        res.changeAddress(testAddress)
        service.update(res)
        expect(created).toHaveBeenCalledTimes(0)
        expect(addressChanged).toHaveBeenCalledTimes(0)
    })

    /*it("deve chamar o evento de cliente criado", async () => {
        const addressChanged = jest.spyOn(service.addressChangedListener, "handle")
        const created = jest.spyOn(service.createdListener, "handle")
        const res = await service.create("Mãe Joana", testAddress)
        expect(res).toBeDefined()
        expect(created).toHaveBeenCalled()
        expect(addressChanged).toHaveBeenCalledTimes(0)
    })

    it("deve chamar o evento de endereço alterado", async () => {
        const addressChanged = jest.spyOn(service.addressChangedListener, "handle")
        const created = jest.spyOn(service.createdListener, "handle")
        const res = Customer.new("123", "c1")
        res.defineAddress(testAddress)

        testAddress = new Address("Rua sobe desce", 0, "12345", "Narnia")
        res.changeAddress(testAddress)
        service.update(res)
        expect(created).toHaveBeenCalledTimes(0)
        expect(addressChanged).toHaveBeenCalledTimes(1)
    })*/
})
