export default class Address {
    _street: string = ""
    _number: number = 0
    _zip: string = ""
    _city: string = ""

    constructor(street: string, number: number, zip: string, city: string) {
        this._street = street
        this._number = number
        this._city = city
        this._zip = zip
        this.validate()
    }

    validate() {
        if (this._street == "") {
            throw new Error("a rua é obrigatória")
        }
        if (this._city == "") {
            throw new Error("a cidade é obrigatória")
        }
        if (this._zip == "") {
            throw new Error("o cep é obrigatório")
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