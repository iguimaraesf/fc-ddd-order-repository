import { CustomerInterface } from "../../../domain/customer/entity/customer.interface"
import CustomerFactory from "../../../domain/customer/factory/customer.factory"
import Address from "../../../domain/customer/value-object/address"
import { InputUpdateCustomerDto } from "./update.customer.dto"
import UpdateCustomerUseCase from "./update.customer.usecase"

let customer = CustomerFactory.createWithAddress("John",
            new Address("Street", 123, "zip", "city"))
let input: InputUpdateCustomerDto = {
    id: "1",
    name: "",
    address: {
        street: "",
        number: 0,
        zip: "",
        city: "",
    },
}

let MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe("Unit test update customer usecase", () => {
    beforeEach(() => {
        customer = CustomerFactory.createWithAddress("John",
            new Address("Street", 123, "zip", "city"))
        input = {
            id: customer.id,
            name: "John updated",
            address: {
                street: "updated street",
                number: 1234,
                zip: "zip updated",
                city: "city updated",
            },
        }
        MockRepository = () => {
            return {
                find: jest.fn().mockReturnValue(Promise.resolve(customer)),
                findAll: jest.fn(),
                create: jest.fn(),
                update: jest.fn(), //.mockReturnValue(Promise.resolve(input)),
            }
        }
    })

    it("should update a customer", async() => {
        const repository = MockRepository()
        const usecase = new UpdateCustomerUseCase(repository)

        const output = await usecase.execute(input)
        expect(output).toEqual(input)
    })

    it("should throw an update error", async() => {
        const repository = MockRepository()
        repository.update.mockImplementation(() => {
            throw new Error("Network error")
        })
        const usecase = new UpdateCustomerUseCase(repository)

        await expect(usecase.execute(input)).rejects.toThrow("Network error")
    })

    it("should throw an error when name is missing", async() => {
        const repository = MockRepository()
        const usecase = new UpdateCustomerUseCase(repository)

        input.name = ""
        await expect(usecase.execute(input)).rejects.toThrow("customer: name is required")
    })

    it("should throw an error when street is missing", async() => {
        const repository = MockRepository()
        const usecase = new UpdateCustomerUseCase(repository)

        input.address.street = ""
        await expect(usecase.execute(input)).rejects.toThrow("address: street is required")
    })

})
