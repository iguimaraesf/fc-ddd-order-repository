import ProductFactory from "./product.factory"

describe("teste unitário da fábrica de produtos", () => {
    it("deve criar um produto do tipo A", () => {
        const product = ProductFactory.create("a", "Produto A", 1)
        expect(product.id).toBeDefined()
        expect(product.name).toBe("Produto A")
        expect(product.price).toBe(1)
        expect(product.constructor.name).toBe("Product")
    })

    it("deve criar um produto do tipo B", () => {
        const product = ProductFactory.create("b", "Produto B", 1)
        expect(product.id).toBeDefined()
        expect(product.name).toBe("Produto B")
        expect(product.price).toBe(2)
        expect(product.constructor.name).toBe("ProductDoubledPrice")
    })
    it("deve dar erro com um tipo de produto desconhecido", () => {
        expect(() => ProductFactory.create("c", "Product C", 1))
            .toThrow("Tipo de produto desconhecido")
    })
})
