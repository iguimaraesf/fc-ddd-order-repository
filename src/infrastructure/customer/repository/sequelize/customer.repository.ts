import Address from "../../../../domain/customer/value-object/address";
import CustomerModel from "./customer.model";
import CustomerRepositoryInterface from "../../../../domain/customer/repository/customer-repository.interface";
import { CustomerInterface } from "../../../../domain/customer/entity/customer.interface";
import CustomerFactory from "../../../../domain/customer/factory/customer.factory";

export default class CustomerRepository implements CustomerRepositoryInterface {
    async create(entity: CustomerInterface): Promise<void> {
        await CustomerModel.create({
            id: entity.id,
            name: entity.name,
            street: entity.address.street,
            active: entity.active,
            number: entity.address.number,
            city: entity.address.city,
            zipcode: entity.address.zip,
            rewardPoints: entity.rewardPoints,
        })
    }

    async update(entity: CustomerInterface): Promise<void> {
        await CustomerModel.update({
            name: entity.name,
            street: entity.address.street,
            number: entity.address.number,
            city: entity.address.city,
            zipcode: entity.address.zip,
            rewardPoints: entity.rewardPoints,
        },{
            where: {
                id: entity.id
            }
        })
    }

    async find(id: string): Promise<CustomerInterface> {
        let model: CustomerModel
        try {
            model = await CustomerModel.findOne({
                where: {
                    id: id
                },
                rejectOnEmpty: true
            })
        } catch (error) {
            throw new Error("cliente não encontrado")
        }
        return this.toCustomer(model)
    }

    async findAll(): Promise<CustomerInterface[]> {
        const models = await CustomerModel.findAll()
        return models.map(model => 
            this.toCustomer(model)
        )
    }

    private toCustomer(model: CustomerModel): CustomerInterface {
        const res = CustomerFactory.newInstance(model.id, model.name)
        res.defineAddress(new Address(
            model.street,
            model.number,
            model.zipcode,
            model.city
        ))
        res.addRewardPoints(model.rewardPoints)
        return res
    }

}
