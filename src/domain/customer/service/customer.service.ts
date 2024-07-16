import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import { Mediator } from "../../@shared/service/mediator";
import Customer from "../entity/customer";
import {v4 as uuid} from 'uuid'
import { CustomerCreated } from "../event/customer-created.event";
import { CustomerAddressChanged } from "../event/customer-address-changed.event";
import { CustomerAddressChangedListener, CustomerCreatedListener } from "../listeners/send-email.listener";
import Address from "../value-object/address";

export default class CustomerService {
    private createdHandler: CustomerCreatedListener
    private addressChangedHandler: CustomerAddressChangedListener

    constructor(
        private customerRepo: CustomerRepository, 
        private mediator: Mediator
    ) {
        this.createdHandler = new CustomerCreatedListener()
        this.addressChangedHandler = new CustomerAddressChangedListener()
        // O parâmetro não vem com os dados do registro porque é criado no início
        // Para este caso não precisa.
        this.mediator.register(CustomerCreated.name, (event: CustomerCreated) => {
            this.createdHandler.handle(event)
        })
        this.mediator.register(CustomerAddressChanged.name, (event: CustomerAddressChanged) => {
            this.addressChangedHandler.handle(event)
        })
    }

    async create(name: string, address: Address) {
        const customer = Customer.create(uuid(), name)
        customer.defineAddress(address)
        this.customerRepo.create(customer)
        this.mediator.publish(customer)
        return customer
    }

    async update(customer: Customer) {
        this.customerRepo.update(customer)
        this.mediator.publish(customer)
    }

    get createdListener() {
        return this.createdHandler
    }

    get addressChangedListener() {
        return this.addressChangedHandler
    }
}
