import { CustomerInterface } from "../../../domain/customer/entity/customer.interface";
import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface";
import { InputListCustomerDto, OutputListCustomerDto } from "./list.customer.dto";

export default class ListCustomerUseCase {
    constructor(private repository: CustomerRepositoryInterface) {}

    async execute(input: InputListCustomerDto): Promise<OutputListCustomerDto> {
        const customers = await this.repository.findAll()
        return OutputMapper.toOutput(customers)
    }
}

class OutputMapper {
    static toOutput(customers: CustomerInterface[]): OutputListCustomerDto {
        return {
            customers: customers.map((customer) => ({
                id: customer.id,
                name: customer.name,
                address: {
                    street: customer.address.street,
                    number: customer.address.number,
                    zip: customer.address.zip,
                    city: customer.address.city,
                }
            }))
        }
    }
}
