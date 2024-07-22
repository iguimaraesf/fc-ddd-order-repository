import Customer from "../entity/customer"
import { v4 as uuid } from "uuid"
import Address from "../value-object/address";

export default class CustomerFactory {
    public static create(name: string): Customer {
        return Customer.create(uuid(), name);
    }
    
    public static createWithAddress(name: string, address: Address): Customer {
        const customer = CustomerFactory.create(name);
        customer.defineAddress(address);
        return customer;
    }
}