import { InputCreateCustomerDto } from "./create.customer.dto"
import CreateCustomerUseCase from "./create.customer.usecase"

let input: InputCreateCustomerDto = {
    name: null,
    address: null,
}

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe("Unit test create customer usecase", () => {
    beforeEach(() => {
        input = {
            name: "John",
            address: {
                street: "Street",
                number: 777,
                zip: "Zip",
                city: "City",
            }
        }
    })

    it("should create a customer", async() => {
        const repository = MockRepository()
        const usecase = new CreateCustomerUseCase(repository)

        const output = await usecase.execute(input)
        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            address: {
                street: input.address.street,
                number: input.address.number,
                zip: input.address.zip,
                city: input.address.city,
            },
        })
    })

    it("should throw an error when name is missing", async() => {
        const repository = MockRepository()
        const usecase = new CreateCustomerUseCase(repository)

        input.name = ""
        await expect(usecase.execute(input)).rejects.toThrow("o nome é obrigatório")
    })

    it("should throw an error when street is missing", async() => {
        const repository = MockRepository()
        const usecase = new CreateCustomerUseCase(repository)

        input.address.street = ""
        await expect(usecase.execute(input)).rejects.toThrow("a rua é obrigatória")
    })
})
