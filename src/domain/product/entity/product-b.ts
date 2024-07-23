import Product from "./product"

export default class ProductDoubledPrice extends Product {

    constructor(id: string, name: string, price: number) {
        super(id, name, price)
    }

    get price(): number {
        return super.price * 2
    }

}