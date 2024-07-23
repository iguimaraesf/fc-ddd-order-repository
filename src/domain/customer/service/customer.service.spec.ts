import { Sequelize } from "sequelize-typescript"
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model"
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository"
import CustomerService from "./customer.service"
import Address from "../value-object/address"
import CustomerFactory from "../factory/customer.factory"

describe("testes unitários do serviço de clientes (customers)", () => {
    let sequelize: Sequelize
    let repository: CustomerRepository
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
        service = new CustomerService(repository)
        testAddress = new Address("Street abc", 1010, "69999", "Niverland")
    })


    afterEach(async() => {
        await sequelize.close()
    })

    it("deve executar o método update do repositório", async () => {
        const repoCall = jest.spyOn(repository, "update")
        const res = CustomerFactory.newInstance("123", "c1")
        res.defineAddress(testAddress)

        res.changeAddress(testAddress)
        await service.update(res)
        expect(repoCall).toHaveBeenCalled()
    })

    it("deve executar o método create do repositório", async () => {
        const repoCall = jest.spyOn(repository, "create")
        const res = CustomerFactory.createWithAddress("Mãe Joana", testAddress)
        await service.create(res)
        expect(repoCall).toHaveBeenCalled()
    })

})
