import ProductFactory from "../../../domain/product/factory/product.factory"
import FindProductUseCase from "./find.product.usecase"

const entity = ProductFactory.newInstance("a", "123", "Product 1", 1.11)

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(entity)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe("Unit test for finding product usecase", () => {
    it("should find a product by id", async () => {
        const input = {
            id: "123",
        }
        const repository = MockRepository()
        const usecase = new FindProductUseCase(repository)
        const output = await usecase.execute(input)
        const expected = {
            id: "123",
            name: "Product 1",
            price: 1.11,
        }
        expect(output).toEqual(expected)
    })

    it("should throw an error when a product is not found", () => {
        const input = {
            id: "123",
        }
        const repository = MockRepository()
        repository.find.mockImplementation(() => {
            throw new Error("Product not found")
        })
        const usecase = new FindProductUseCase(repository)

        expect(() => {
            return usecase.execute(input)
        }).rejects.toThrow(new Error("Product not found"))
    })
})
