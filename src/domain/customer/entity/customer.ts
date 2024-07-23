// Modelagem de domínios ricos - entidades carregam as regras de negócio do sistema
import Address from "../value-object/address"
import { CustomerCreatedEvent } from "../event/customer-created.event";
import { CustomerNameChangedEvent } from "../event/customer-name-changed.event";
import { CustomerAddressChangedEvent } from "../event/customer-address-changed.event";
import { CustomerInterface } from "./customer.interface";

// Os dados devem estar CONSISTENTES sempre.
export default class Customer extends CustomerInterface {
    private _id: string
    private _name: string = ""
    private _address!: Address
    private _active: boolean = false
    private _rewardPoints: number = 0
    
    private constructor(id: string, name: string) {
        super()
        // uma entidade sempre se auto valida
        this._id = id
        this._name = name
        this.validate()
    }

    static create(id: string, name: string): CustomerInterface {
        const res = Customer.newInstance(id, name)
        res.addEvent(new CustomerCreatedEvent({
            customerId: res.id,
            customerName: res.name,
        }))
        return res
    }

    static newInstance(id: string, name: string): CustomerInterface {
        return new Customer(id, name)
    }

    validate() {
        if (this._id.length === 0) {
            throw new Error("o id é obrigatório")
        }
        if (this._name.length === 0) {
            throw new Error("o nome é obrigatório")
        }
    }
    

    // ao invés de set name
    // expressa o negócio. Não é getters e setters
    // o estado da entidade deve estar sempre correto
    changeName(name: string): void {
        // não passa por cima das regras de negócio
        if (this.name == name) {
            return
        }
        this._name = name
        this.validate()
        super.addEvent(new CustomerNameChangedEvent(name))
    }

    changeAddress(address: Address): void {
        if (this.address == address) {
            return
        }
        this.defineAddress(address)
        super.addEvent(new CustomerAddressChangedEvent(address.toString()))
    }

    defineAddress(address: Address): void {
        this._address = address
        this.validate()
    }

    addRewardPoints(rewardPoints: number): void {
        this._rewardPoints += rewardPoints
        this.validate()
    }

    get id(): string {
        return this._id
    }

    get name(): string {
        return this._name
    }

    get address(): Address {
        return this._address
    }

    get active(): boolean {
        return this._active
    }

    get rewardPoints(): number {
        return this._rewardPoints
    }
    
    activate(): void {
        if (this._address === undefined) {
            throw new Error("o endereço é obrigatório para ativar o cliente")
        }
        this._active = true
    }

    isActive(): boolean {
        return this._active
    }

    deactivate(): void {
        this._active = false
    }
}