import Address from "../value-object/address"
import Customer from "./customer"

describe("Customer unit tests", () => {
    it("should throw error when id is empty", () => {
        expect(() => {
            Customer.newInstance("", "Jhon")
        }).toThrow("customer: id is required")
    })
    it("should throw error when name is empty", () => {
        expect(() => {
            Customer.newInstance("123", "")
        }).toThrow("customer: name is required")
    })
    it("should throw error when id and name are empty", () => {
        expect(() => {
            Customer.newInstance("", "")
        }).toThrow("customer: id is required,customer: name is required")
    })
    it("should change the name", () => {
        const customer = Customer.newInstance("123", "John")
        customer.changeName("Jane")
        expect(customer.name).toBe("Jane")
    })
    it("should activate a customer", () => {
        const customer = Customer.newInstance("1", "Fabio")
        const address = new Address("street 1", 123, "01001-000", "São Paulo")
        customer.changeAddress(address)

        customer.activate()
        expect(customer.isActive()).toBeTruthy()
    })
    it("should throw error when the address is undefined when you activate a customer", () => {
        const customer = Customer.newInstance("2", "Paola")

        expect(() => {
            customer.activate()
        }).toThrow("o endereço é obrigatório para ativar o cliente")
    })
    it("should deactivate a customer", () => {
        const customer = Customer.newInstance("1", "Fabio")

        customer.deactivate()
        expect(customer.isActive()).toBeFalsy()
    })
})