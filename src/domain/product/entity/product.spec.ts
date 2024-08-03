import NotificationError from "../../@shared/notification/notification.error"
import ProductFactory from "../factory/product.factory"
import Product from "./product"
import ProductDoubledPrice from "./product-b"

describe("product unit tests", () => {
    it("should throw an error when the id is empty", () => {
        expect(() => {
            const product = ProductFactory.newInstance("a", "", "Produto 1", 100)
        }).toThrow("product: id is required")
    })
    it("should throw an error when the name is empty", () => {
        expect(() => {
            const product = ProductFactory.newInstance("a", "1", "", 100)
        }).toThrow("product: name is required")
    })
    it("should throw an error when the price is less than zero", () => {
        expect(() => {
            const product = ProductFactory.newInstance("a", "1", "Teste", -100)
        }).toThrow("product: price must be greater than zero")
    })

    // Desafio Clean Architecture
    it("should throw an error with all messages", () => {
        expect(() => {
            ProductFactory.newInstance("a", "", "", -1)
        }).toThrow("product: id is required,product: name is required,product: price must be greater than zero")
        expect(() => {
            ProductFactory.newInstance("a", "", "", -1)
        }).toThrow(NotificationError)
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