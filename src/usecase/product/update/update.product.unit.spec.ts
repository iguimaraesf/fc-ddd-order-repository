import ProductFactory from "../../../domain/product/factory/product.factory"
import UpdateProductUseCase from "./update.product.usecase"

// ___________________________
//
// Estava dando erro porque a variável entity estava como constante.
// A função update ATUALIZA O VALOR dessa variável, e isso afetava os outros testes.
// ___________________________
let entity = ProductFactory.create("a", "xxxx", 0.01)
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
        update: jest.fn(),
    }
}

describe("Unit test update customer usecase", () => {
    beforeEach(() => {
        entity = ProductFactory.create("a", "Product - One", 9.95)
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
        input.name = ""
        const repository = MockRepository()
        const usecase = new UpdateProductUseCase(repository)

        await expect(usecase.execute(input)).rejects.toThrow("product: name is required")
    })

    it("should throw an error when the price is invalid", async() => {
        input.price = -0.99
        const repository = MockRepository()
        const usecase = new UpdateProductUseCase(repository)

        await expect(usecase.execute(input)).rejects.toThrow("product: price must be greater than zero")
    })
})
