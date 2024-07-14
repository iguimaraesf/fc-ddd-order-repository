import { UpdateOptions } from "sequelize";
import Order from "../../../../domain/checkout/entity/order";
import OrderRepositoryInterface from "../../../../domain/checkout/repository/order-repository.interface";
import OrderItemModel from "./order-item.model";
import OrderModel from "./order.model";
import OrderItem from "../../../../domain/checkout/entity/order_item";

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
        const sqlz = OrderModel.sequelize
        await sqlz.transaction(async (t) =>{
            await OrderItemModel.destroy({
                where: {
                    order_id: entity.id
                }
            })
            const novosItens = entity.items.map((item) => ({
                id: item.id,
                name: item.name,
                price: item.price,
                product_id: item.productId,
                quantity: item.quantity,
                order_id: entity.id,
            }))
            await OrderItemModel.bulkCreate(novosItens, {
                transaction: t,
            })
            const condicao: UpdateOptions<any> = {
                where: {
                    id: entity.id
                },
                transaction: t,
            }
            await OrderModel.update({
                total: entity.total(),
            }, condicao)
        })
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
