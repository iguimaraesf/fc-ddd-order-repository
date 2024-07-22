import { Sequelize } from "sequelize-typescript"
import CustomerModel from "./customer.model"
import CustomerRepository from "./customer.repository"
import Customer from "../../../../domain/customer/entity/customer"
import Address from "../../../../domain/customer/value-object/address"

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
        const customer = Customer.new("1", "customer 1")
        const address = new Address("street 1", 1, "Zipcode 1", "City 1")
        const customerRepository = new CustomerRepository()
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
        const customer = Customer.new("1", "customer 1")
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
        const customer = Customer.new("1", "customer 1")
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
        const customer1 = Customer.new("1", "customer 1")
        customer1.changeAddress(address)
        await customerRepository.create(customer1)
        const customer2 = Customer.new("2", "customer 2")
        customer2.changeAddress(address)
        await customerRepository.create(customer2)

        const foundCustomers = await customerRepository.findAll()

        //customer1.clearEvents()
        //customer2.clearEvents()
        expect(foundCustomers).toHaveLength(2);
        expect(foundCustomers).toContainEqual(customer1);
        expect(foundCustomers).toContainEqual(customer2);

        /*const removeEvents = (customer: Customer) => {
            const customerWithoutEvents = { ...customer };
            delete customerWithoutEvents.events;
            return customerWithoutEvents;
        }

        const foundCustomersWithoutEvents = foundCustomers.map(removeEvents);
        const customer1WithoutEvents = removeEvents(customer1);
        const customer2WithoutEvents = removeEvents(customer2);

        expect(foundCustomersWithoutEvents).toHaveLength(2);
        expect(foundCustomersWithoutEvents).toContainEqual(customer1WithoutEvents);
        expect(foundCustomersWithoutEvents).toContainEqual(customer2WithoutEvents);*/
    })
})
