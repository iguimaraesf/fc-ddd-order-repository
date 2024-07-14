import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import { Mediator } from "../../@shared/service/mediator";
import Customer from "../entity/customer";
import {v4 as uuid} from 'uuid'


export class CustomerService {

    constructor(
        private customerRepo: CustomerRepository, 
        private mediator: Mediator
    ) {}

    async create(name: string){
        const customer = Customer.create(uuid(), name)
        this.customerRepo.create(customer)
        this.mediator.publish(customer)
        return customer;
    }
}
