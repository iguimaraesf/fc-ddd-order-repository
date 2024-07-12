import { Sequelize } from "sequelize-typescript"
import CustomerModel from "../db/sequelize/model/customer.model"
import CustomerRepository from "./customer.repository"
import Customer from "../../domain/entity/customer"
import Address from "../../domain/entity/address"
import OrderModel from "../db/sequelize/model/order.model"
import OrderItemModel from "../db/sequelize/model/order-item.model"
import ProductModel from "../db/sequelize/model/product.model"
import ProductRepository from "./product.repository"
import Product from "../../domain/entity/product"
import OrderItem from "../../domain/entity/order_item"
import Order from "../../domain/entity/order"
import OrderRepository from "./order.repository"
import CustomerRepositoryInterface from "../../domain/repository/customer-repository.interface"
import OrderRepositoryInterface from "../../domain/repository/order-repository.interface"

describe("Teste do repositório de pedidos", () => {
    const orderRepository: OrderRepositoryInterface = new OrderRepository()
    let sequelize: Sequelize

    beforeEach(async() => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        })
        sequelize.addModels([ProductModel, OrderModel, OrderItemModel, CustomerModel])
        await sequelize.sync()
    })

    afterEach(async() => {
        await sequelize.close()
    })

    it("Deve criar um novo pedido", async () => {
        const { order, customer, orderItem, product } = await criarOrdemDeTeste(orderRepository)

        const orderModel = await OrderModel.findOne({
            where: { id: order.id },
            include: ["items"],
        })

        expect(orderModel.toJSON()).toStrictEqual({
            id: order.id,
            customer_id: customer.id,
            total: order.total(),
            items: [
                {
                    id: orderItem.id,
                    name: orderItem.name,
                    price: orderItem.price,
                    quantity: orderItem.quantity,
                    order_id: order.id,
                    product_id: product.id,
                },
            ],
        })
    })

    it("Deve atualizar um pedido existente", async () => {
        let { order, customer, orderItem, product } = await criarOrdemDeTeste(orderRepository)
        const customerNaoPodeAlterar = new Customer("9991", "Zezinho")
        const p2 = await criarOutroProduto()
        const orderItem2 = new OrderItem(
            "item 2",
            p2.name,
            p2.price,
            p2.id,
            1,
        )
    
        order = new Order(order.id, customerNaoPodeAlterar.id, [orderItem, orderItem2])
        await orderRepository.update(order)

        const orderModel = await OrderModel.findOne({
            where: { id: order.id },
            include: ["items"],
        })
        expect(orderModel.toJSON()).toStrictEqual({
            id: order.id,
            customer_id: customer.id,
            total: order.total(),
            items: [
                {
                    id: orderItem.id,
                    name: orderItem.name,
                    price: orderItem.price,
                    quantity: orderItem.quantity,
                    order_id: order.id,
                    product_id: orderItem.productId,
                },
                {
                    id: orderItem2.id,
                    name: orderItem2.name,
                    price: orderItem2.price,
                    quantity: orderItem2.quantity,
                    order_id: order.id,
                    product_id: orderItem2.productId,
                },
            ],
        })
    })

    it("Deve buscar por um pedido pelo ID", async() => {
        let { order, customer, orderItem, product } = await criarOrdemDeTeste(orderRepository)
        const res = await orderRepository.find(order.id)
        expect(order).toEqual(res)
    })

    it("Deve buscar por todos os pedidos", async() => {
        let { order, customer, orderItem, product } = await criarOrdemDeTeste(orderRepository)
        const res = await orderRepository.findAll()
        expect([order]).toEqual(res)
    })
})


async function criarOrdemDeTeste(orderRepository: OrderRepositoryInterface) {
    const customerRepository: CustomerRepositoryInterface = new CustomerRepository()

    const customer = new Customer("123", "Customer 1")
    const address = new Address("street 1", 1, "zip 1", "city 1")
    customer.changeAddress(address)
    await customerRepository.create(customer)

    const customer2 = new Customer("9991", "Customer 2")
    customer2.changeAddress(address)
    await customerRepository.create(customer2)

    const productRepository = new ProductRepository()
    const product = new Product("111", "Product 1", 10)
    await productRepository.create(product)

    const orderItem = new OrderItem(
        "1",
        product.name,
        product.price,
        product.id,
        2
    )
    const order = new Order("222", customer.id, [orderItem])
    await orderRepository.create(order)
    return { order, customer, orderItem, product }
}

async function criarOutroProduto(): Promise<Product> {
    const productRepository = new ProductRepository()
    const product = new Product("222", "Product 2", 22.22)
    await productRepository.create(product)
    return product
}
