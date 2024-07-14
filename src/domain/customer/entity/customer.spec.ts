import Address from "../value-object/address"
import Customer from "./customer"

describe("Customer unit tests", () => {
    it("should throw error when id is empty", () => {
        expect(() => {
            let customer = new Customer("", "Jhon")
        }).toThrow("Id is required")
    })
    it("should throw error when name is empty", () => {
        expect(() => {
            let customer = new Customer("123", "")
        }).toThrow("Name is required")
    })
    it("should change the name", () => {
        const customer = new Customer("123", "John")
        customer.changeName("Jane")
        expect(customer.name).toBe("Jane")
    })
    it("should activate a customer", () => {
        const customer = new Customer("1", "Fabio")
        const address = new Address("street 1", 123, "01001-000", "São Paulo")
        customer.changeAddress(address)

        customer.activate()
        expect(customer.isActive()).toBeTruthy()
    })
    it("should throw error when the address is undefined when you activate a customer", () => {
        const customer = new Customer("2", "Paola")

        expect(() => {
            customer.activate()
        }).toThrow("Address is mandatory to activate a custumer")
    })
    it("should deactivate a customer", () => {
        const customer = new Customer("1", "Fabio")

        customer.deactivate()
        expect(customer.isActive()).toBeFalsy()
    })
})