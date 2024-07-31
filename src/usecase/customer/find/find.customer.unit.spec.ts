import Customer from "../../../domain/customer/entity/customer"
import Address from "../../../domain/customer/value-object/address"
import FindCustomerUseCase from "./find.customer.usecase"

const entity = Customer.create("123", "John")
const address = new Address("street", 123, "zip", "city")
entity.changeAddress(address)

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(entity)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe("Unit test find customer usecase", () => {
    it("should find a customer", async () => {
        const input = {
            id: "123",
        }
        const repository = MockRepository()
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

    it("should not find a customer", async () => {
        const input = {
            id: "123",
        }
        const repository = MockRepository()
        repository.find.mockImplementation(() => {
            throw new Error("Customer not found")
        })
        const usecase = new FindCustomerUseCase(repository)

        expect(() => {
            return usecase.execute(input)
        }).rejects.toThrow(new Error("Customer not found"))
    })
})
