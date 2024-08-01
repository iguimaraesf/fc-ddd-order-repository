import ProductFactory from "../../../domain/product/factory/product.factory"
import UpdateProductUseCase from "./update.product.usecase"

const entity = ProductFactory.create("a", "Product - One", 9.95)
let input = {
    id: "",
    name: "",
    price: 0.00,
}

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(entity)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(), //.mockReturnValue(Promise.resolve(input)),
    }
}

describe("Unit test update customer usecase", () => {
    beforeEach(() => {
        input = {
            id: entity.id,
            name: "Updated Product",
            price: 14.49,
        }
    })

    it("should update a product", async() => {
        const repository = MockRepository()
        const usecase = new UpdateProductUseCase(repository)

        const output = await usecase.execute(input)
        expect(output).toEqual(input)
    })

    it("should throw an update error", async() => {
        const repository = MockRepository()
        repository.update.mockImplementation(() => {
            throw new Error("Network error")
        })
        const usecase = new UpdateProductUseCase(repository)

        await expect(usecase.execute(input)).rejects.toThrow("Network error")
    })

    it("should throw an error when name is missing", async() => {
        const repository = MockRepository()
        const usecase = new UpdateProductUseCase(repository)

        input.name = ""
        await expect(usecase.execute(input)).rejects.toThrow("Name is required")
    })

    it("should throw an error when the price is invalid", async() => {
        const repository = MockRepository()
        const usecase = new UpdateProductUseCase(repository)

        input.price = -0.99
        await expect(usecase.execute(input)).rejects.toThrow("Price must be greater than zero")
    })
})
