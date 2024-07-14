// Modelagem de domínios ricos - entidades carregam as regras de negócio do sistema

import Address from "../value-object/address"

// Os dados devem estar CONSISTENTES sempre.
export default class Customer {
    private _id: string
    private _name: string = ""
    private _address!: Address
    private _active: boolean = false
    private _rewardPoints: number = 0
    
    constructor(id: string, name: string) {
        // uma entidade sempre se auto valida
        this._id = id
        this._name = name
        // this._address = address
        this.validate()
    }

    validate() {
        if (this._id.length === 0) {
            throw new Error("Id is required")
        }
        if (this._name.length === 0) {
            throw new Error("Name is required")
        }
    }
    

    // ao invés de set name
    // expressa o negócio. Não é getters e setters
    // o estado da entidade deve estar sempre correto
    changeName(name: string): void {
        // não passa por cima das regras de negócio
        this._name = name
        this.validate()
    }

    changeAddress(address: Address) {
        this._address = address
    }

    addRewardPoints(rewardPoints: number) {
        this._rewardPoints += rewardPoints
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
            throw new Error("Address is mandatory to activate a custumer")
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