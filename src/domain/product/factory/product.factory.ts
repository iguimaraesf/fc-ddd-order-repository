import Product from "../entity/product"
import ProductDoubledPrice from "../entity/product-b"
import ProductInterface from "../entity/product.interface"
import { v4 as uuid } from "uuid"

export default class ProductFactory {
    public static create(type: string, name: string, price: number): ProductInterface {
        switch (type) {
            case "a":
                return new Product(uuid(), name, price)
            case "b":
                return new ProductDoubledPrice(uuid(), name, price)
            default:
                throw Error("Tipo de produto desconhecido")
        }
    }
}