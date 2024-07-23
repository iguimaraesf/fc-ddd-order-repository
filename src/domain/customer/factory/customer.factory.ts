import Customer from "../entity/customer"
import { v4 as uuid } from "uuid"
import Address from "../value-object/address";
import { CustomerInterface } from "../entity/customer.interface";

export default class CustomerFactory {
    public static create(name: string): CustomerInterface {
        return Customer.create(uuid(), name);
    }
    
    static createWithAddress(name: string, address: Address): CustomerInterface {
        const customer = CustomerFactory.create(name);
        customer.defineAddress(address);
        return customer;
    }

    static newInstance(id: string, name: string) {
        return Customer.newInstance(id, name)
    }

    static newInstanceWithAddress(id: string, name: string, address: Address): CustomerInterface {
        const customer = CustomerFactory.newInstance(id, name);
        customer.defineAddress(address);
        return customer;
    }

}