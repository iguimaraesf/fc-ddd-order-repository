import { UpdateOptions } from "sequelize";
import Order from "../../domain/entity/order";
import OrderRepositoryInterface from "../../domain/repository/order-repository.interface";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import OrderModel from "../db/sequelize/model/order.model";
import OrderItem from "../../domain/entity/order_item";

export default class OrderRepository implements OrderRepositoryInterface {
    async create(entity: Order): Promise<void> {
        const registro = {
            id: entity.id,
            customer_id: entity.customerId,
            total: entity.total(),
            items: entity.items.map((item) => ({
                id: item.id,
                name: item.name,
                price: item.price,
                product_id: item.productId,
                quantity: item.quantity,
            })),
        };
        const opcoes = {
            include: [{ model: OrderItemModel }],
        }
        await OrderModel.create(registro, opcoes);
    }
    async update(entity: Order): Promise<void> {
        const registro = {
            customer_id: entity.customerId,
            /*items: entity.items.map((item) => ({
                id: item.id,
                name: item.name,
                price: item.price,
                product_id: item.productId,
                quantity: item.quantity,
            })),*/
        };
        const condicao: UpdateOptions<any> = {
            where: {
                id: entity.id
            },
        }
        try {
            await OrderModel.update(registro, condicao)
        } catch (error) {
            console.log(error)
            throw error
        }
    }
    async find(id: string): Promise<Order> {
        const model = await OrderModel.findOne({
            where: { id: id },
            include: ["items"],
        })
        const itens: OrderItem[] = this._toItemModel(model.items)
        return new Order(model.id, model.customer_id, itens)
    }
    async findAll(): Promise<Order[]> {
        const model = await OrderModel.findAll({include: ["items"]})
        const res: Order[] = model.map((o) => new Order(o.id, o.customer_id, this._toItemModel(o.items)))
        return res
    }

    _toItemModel(items: OrderItemModel[]): OrderItem[] {
        if (!items) {
            return []
        }
        return items.map((i) => new OrderItem(
            i.id, i.name, i.price, i.product_id, i.quantity
        ))
    }
}
