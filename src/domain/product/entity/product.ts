import { AggregateRoot } from "../../@shared/domain/aggregate-root"
import NotificationError from "../../@shared/notification/notification.error"
import ProductCreatedEvent from "../event/product-created.event"
import ProductInterface from "./product.interface"

export default class Product extends ProductInterface {
    private _name: string
    private _price: number

    protected constructor(id: string, name: string, price: number) {
        super()
        this._id = id
        this._name = name
        this._price = price
        this.validate()
    }

    static createWith(id: string, name: string, price: number): ProductInterface {
        const res = Product.newInstance(id, name, price)
        res.addEvent(new ProductCreatedEvent({
            id: res.id,
            name: res.name,
            price: res.price
        }))
        return res
    }

    static newInstance(id: string, name: string, price: number): ProductInterface {
        return new Product(id, name, price)
    }

    get id(): string {
        return this._id
    }

    get name(): string {
        return this._name
    }

    get price(): number {
        return this._price
    }

    changeName(name: string) {
        this._name = name
        this.validate()
    }

    changePrice(price: number) {
        this._price = price
        this.validate()
    }
    
    validate() {
        if (this._id.length === 0) {
            this.notification.addError({
                context: "product",
                message: "id is required",
            })
        }
        if (this._name.length === 0) {
            this.notification.addError({
                context: "product",
                message: "name is required",
            })
        }
        if (this._price <= 0) {
            this.notification.addError({
                context: "product",
                message: "price must be greater than zero",
            })
        }
        if (this.notification.hasErrors()) {
            throw new NotificationError(this.notification.getErrors())
        }
    }
}