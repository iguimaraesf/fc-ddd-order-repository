import { Sequelize } from "sequelize-typescript"
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model"
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository"
import Customer from "../../../domain/customer/entity/customer"
import Address from "../../../domain/customer/value-object/address"
import FindCustomerUseCase from "./find.customer.usecase"

describe("Test find customer usecase", () => {
    let sequelize: Sequelize

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        })
        sequelize.addModels([CustomerModel])
        await sequelize.sync()
    })


    afterEach(async() => {
        await sequelize.close()
    })

    it("should find a customer", async () => {
        const repository = new CustomerRepository()
        const entity = Customer.create("123", "John")
        const address = new Address("street", 123, "zip", "city")
        entity.defineAddress(address)
        const customerCreated = await repository.create(entity)


        const input = {
            id: "123",
        }
        const usecase = new FindCustomerUseCase(repository)
        const result = await usecase.execute(input)
        const output = {
            id: "123",
            name: "John",
            address: {
                street: "street",
                number: 123,
                city: "city",
                zip: "zip",
            }
        }
        expect(result).toEqual(output)
    })

})
