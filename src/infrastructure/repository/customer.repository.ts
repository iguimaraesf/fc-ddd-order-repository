import Address from "../../domain/entity/address";
import Customer from "../../domain/entity/customer";
import CustomerRepositoryInterface from "../../domain/repository/customer-repository.interface";
import CustomerModel from "../db/sequelize/model/customer.model";

export default class CustomerRepository implements CustomerRepositoryInterface {
    async create(entity: Customer): Promise<void> {
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
    async update(entity: Customer): Promise<void> {
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
    async find(id: string): Promise<Customer> {
        let model: CustomerModel
        try {
            model = await CustomerModel.findOne({
                where: {
                    id: id
                },
                rejectOnEmpty: true
            })
        } catch (error) {
            throw new Error("Customer not found")
        }
        return this.toCustomer(model)
    }
    private toCustomer(model: CustomerModel): Customer {
        const res = new Customer(
            model.id,
            model.name,
        )
        res.changeAddress(new Address(
            model.street,
            model.number,
            model.zipcode,
            model.city
        ))
        res.addRewardPoints(model.rewardPoints)
        return res
    }
    async findAll(): Promise<Customer[]> {
        const models = await CustomerModel.findAll()
        return models.map(model => 
            this.toCustomer(model)
        )
    }

}
