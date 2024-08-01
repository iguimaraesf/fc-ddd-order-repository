import { InputCreateProductDto } from "./create.product.dto"
import CreateProductUseCase from "./create.product.usecase"

let input: InputCreateProductDto = {
    name: null,
    price: null,
}

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe("Unit test for creating products usecase", () => {
    beforeEach(() => {
        input = {
            name: "Product One",
            price: 27.99
        }
    })

    it("should create a product", async() => {
        const repository = MockRepository()
        const usecase = new CreateProductUseCase(repository)

        const result = await usecase.execute(input)
        expect(result).toEqual({
            id: expect.any(String),
            name: input.name,
            price: input.price,
        })
    })

    it("should throw an error when name is missing", async() => {
        const repository = MockRepository()
        const usecase = new CreateProductUseCase(repository)

        input.name = ""
        await expect(usecase.execute(input)).rejects.toThrow("Name is required")
    })

    it("should throw an error when the price is invalid", async() => {
        const repository = MockRepository()
        const usecase = new CreateProductUseCase(repository)

        input.price = -0.99
        await expect(usecase.execute(input)).rejects.toThrow("Price must be greater than zero")
    })
})
