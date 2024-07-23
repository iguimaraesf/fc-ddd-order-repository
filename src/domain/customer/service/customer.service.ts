import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import { Mediator } from "../../@shared/service/mediator";
import Address from "../value-object/address";
import CustomerFactory from "../factory/customer.factory";
import { CustomerInterface } from "../entity/customer.interface";

export default class CustomerService {

    constructor(
        private customerRepo: CustomerRepository, 
        private mediator: Mediator
    ) {
    }

    async create(name: string, address: Address) {
        const customer = CustomerFactory.create(name)
        customer.defineAddress(address)
        this.customerRepo.create(customer)
        //this.mediator.publish(customer)
        return customer
    }

    async update(customer: CustomerInterface) {
        this.customerRepo.update(customer)
        //this.mediator.publish(customer)
    }
}
