import { Sequelize } from "sequelize-typescript"
import CustomerModel from "../db/sequelize/model/customer.model"
import CustomerRepository from "./customer.repository"
import Customer from "../../domain/entity/customer"
import Address from "../../domain/entity/address"

describe("Teste do repositório de cliente", () => {
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

    it("deve criar um cliente", async() => {
        const customerRepository = new CustomerRepository()
        const customer = new Customer("1", "customer 1")
        const address = new Address("street 1", 1, "Zipcode 1", "City 1")
        customer.changeAddress(address)
        await customerRepository.create(customer)

        const customerModel = await CustomerModel.findOne({ where: {id: "1"}})

        expect(customerModel.toJSON()).toStrictEqual({
            id: "1",
            name: customer.name,
            active: customer.active,
            rewardPoints: customer.rewardPoints,
            street: address.street,
            number: address.number,
            zipcode: address.zip,
            city: address.city,
        })
    })

    it("deve atualizar o cliente", async() => {
        const customerRepository = new CustomerRepository()
        const customer = new Customer("1", "customer 1")
        const address = new Address("street 1", 1, "Zipcode 1", "City 1")
        customer.changeAddress(address)
        await customerRepository.create(customer)

        customer.changeName("novonome")
        customer.addRewardPoints(12)
        await customerRepository.update(customer)

        const customerModel2 = await CustomerModel.findOne({ where: {id: "1"}})
        expect(customerModel2.toJSON()).toStrictEqual({
            id: "1",
            name: "novonome",
            active: customer.active,
            rewardPoints: customer.rewardPoints,
            street: address.street,
            number: address.number,
            zipcode: address.zip,
            city: address.city,
        })
    })

    it("deve buscar um cliente", async() => {
        const customerRepository = new CustomerRepository()
        const customer = new Customer("1", "customer 1")
        const address = new Address("street 1", 1, "Zipcode 1", "City 1")
        customer.changeAddress(address)
        await customerRepository.create(customer)

        const customerModel = await CustomerModel.findOne({ where: {id: "1"}})

        const foundCustomer = await customerRepository.find("1")

        expect(customerModel.toJSON()).toStrictEqual({
            id: foundCustomer.id,
            name: foundCustomer.name,
            active: customer.active,
            rewardPoints: customer.rewardPoints,
            street: address.street,
            number: address.number,
            zipcode: address.zip,
            city: address.city,
        })
    })

    it("deve dar erro quando um cliente não é encontrado", async() => {
        const customerRepository = new CustomerRepository()
        expect(async() => {
            await customerRepository.find("1")
        }).rejects.toThrow("Customer not found")
    })

    it("deve buscar todos os clientes", async() => {
        const address = new Address("street 1", 1, "Zipcode 1", "City 1")
        const customerRepository = new CustomerRepository()
        const customer1 = new Customer("1", "customer 1")
        customer1.changeAddress(address)
        await customerRepository.create(customer1)
        const customer2 = new Customer("2", "customer 2")
        customer2.changeAddress(address)
        await customerRepository.create(customer2)

        const foundCustomers = await customerRepository.findAll()

        expect(foundCustomers).toHaveLength(2)
        expect(foundCustomers).toContainEqual(customer1)
        expect(foundCustomers).toContainEqual(customer2)
    })
})
