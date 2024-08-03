import Entity from "../../@shared/entity/entity.abstract"
import NotificationError from "../../@shared/notification/notification.error"

export default class Address extends Entity {
    _street: string = ""
    _number: number = 0
    _zip: string = ""
    _city: string = ""

    constructor(street: string, number: number, zip: string, city: string) {
        super()
        this._street = street
        this._number = number
        this._city = city
        this._zip = zip
        this.validate()
    }

    validate() {
        if (this._street == "") {
            this.notification.addError({
                context: "address",
                message: "street is required",
            })
        }
        if (this._city == "") {
            this.notification.addError({
                context: "address",
                message: "city is required",
            })
        }
        if (this._zip == "") {
            this.notification.addError({
                context: "address",
                message: "zip code is required",
            })
        }
        if (this.notification.hasErrors()) {
            throw new NotificationError(this.notification.getErrors())
        }
    }

    get street(): string {
        return this._street
    }

    get number(): number {
        return this._number
    }

    get city(): string {
        return this._city
    }

    get zip(): string {
        return this._zip
    }

    toString() {
        return `${this._street}, ${this._number} - ${this._city} - ${this._zip}`
    }
}