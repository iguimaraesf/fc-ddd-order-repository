import ProductFactory from "../../../domain/product/factory/product.factory"
import ListProductUseCase from "./list.product.usecase"

const product1 = ProductFactory.create("a", "Product 1", 6.25)

const product2 = ProductFactory.create("a", "Product 2", 1.99)

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn().mockReturnValue(Promise.resolve([product1, product2])),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe("Unit test for listing products usecase", () => {
    it("should list products", async () => {
        const repository = MockRepository()
        const usecase = new ListProductUseCase(repository)
        const input = {}
        const output = await usecase.execute(input)

        expect(output.products.length).toBe(2)
        expect(output.products[0].id).toBe(product1.id)
        expect(output.products[0].name).toBe(product1.name)
        expect(output.products[0].price).toBe(product1.price)
        expect(output.products[1].id).toBe(product2.id)
        expect(output.products[1].name).toBe(product2.name)
        expect(output.products[1].price).toBe(product2.price)
    })
})