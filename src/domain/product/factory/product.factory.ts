import Product from "../entity/product"
import ProductDoubledPrice from "../entity/product-b"
import ProductInterface from "../entity/product.interface"
import { v4 as uuid } from "uuid"

export default class ProductFactory {
    static newInstance(type: string, id: string, name: string, price: number): ProductInterface {
        switch (type) {
            case "a":
                return Product.newInstance(id, name, price)
            case "b":
                return ProductDoubledPrice.newInstance(id, name, price)
            default:
                throw Error("Tipo de produto desconhecido")
        }
    }

    public static create(type: string, name: string, price: number): ProductInterface {
        const id = uuid()
        switch (type) {
            case "a":
                return Product.createWith(id, name, price)
            case "b":
                return ProductDoubledPrice.createWith(id, name, price)
            default:
                throw Error("Tipo de produto desconhecido")
        }
    }
}