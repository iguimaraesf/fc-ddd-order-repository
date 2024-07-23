import ProductCreatedEvent from "../event/product-created.event"
import Product from "./product"
import ProductInterface from "./product.interface"

export default class ProductDoubledPrice extends Product {

    protected constructor(id: string, name: string, price: number) {
        super(id, name, price)
    }

    get price(): number {
        return super.price * 2
    }

    static createWith(id: string, name: string, price: number): ProductInterface {
        const res = ProductDoubledPrice.newInstance(id, name, price)
        res.addEvent(new ProductCreatedEvent({
            id: res.id,
            name: res.name,
            price: res.price
        }))
        return res
    }

    static newInstance(id: string, name: string, price: number): ProductInterface {
        return new ProductDoubledPrice(id, name, price)
    }
}
