import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import Address from "../value-object/address";
import CustomerFactory from "../factory/customer.factory";
import { CustomerInterface } from "../entity/customer.interface";

export default class CustomerService {

    constructor(
        private customerRepo: CustomerRepository, 
    ) {
    }

    async create(customer: CustomerInterface) {
        this.customerRepo.create(customer)
        return customer
    }

    async update(customer: CustomerInterface) {
        this.customerRepo.update(customer)
    }
}
