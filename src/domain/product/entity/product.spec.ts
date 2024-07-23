import ProductFactory from "../factory/product.factory"
import Product from "./product"
import ProductDoubledPrice from "./product-b"

describe("product unit tests", () => {
    it("should throw an error when the id is empty", () => {
        expect(() => {
            const product = ProductFactory.newInstance("a", "", "Produto 1", 100)
        }).toThrow("Id is required")
    })
    it("should throw an error when the name is empty", () => {
        expect(() => {
            const product = ProductFactory.newInstance("a", "1", "", 100)
        }).toThrow("Name is required")
    })
    it("should throw an error when the price is less than zero", () => {
        expect(() => {
            const product = ProductFactory.newInstance("a", "1", "Teste", -100)
        }).toThrow("Price must be greater than zero")
    })
    it("should change name", () => {
        const product = ProductFactory.newInstance("a", "1", "Teste", 100)
        product.changeName("Product 2")
        expect(product.name).toBe("Product 2")
    })
    it("should change price", () => {
        const product = ProductFactory.newInstance("a", "1", "Teste", 100)
        product.changePrice(150)
        expect(product.price).toBe(150)
    })
    it("deve ter o dobro do preço", () => {
        const product = ProductFactory.newInstance("b", "1", "TesteB", 11)
        expect(product.price).toBe(22)
    })
})