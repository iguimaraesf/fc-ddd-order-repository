import { Sequelize } from "sequelize-typescript"
import ProductModel from "../db/sequelize/model/product.model"
import Product from "../../domain/entity/product"
import ProductRepository from "./product.repository"

describe("Teste do repositório de produto", () => {
    let sequelize: Sequelize

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        })
        sequelize.addModels([ProductModel])
        await sequelize.sync()
    })


    afterEach(async() => {
        await sequelize.close()
    })

    it("deve criar um produto", async() => {
        const productRepository = new ProductRepository()
        const product = new Product("1", "produto 1", 100)
        await productRepository.create(product)

        const productModel = await ProductModel.findOne({ where: {id: "1"}})

        expect(productModel.toJSON()).toStrictEqual({
            id: "1",
            name: "produto 1",
            price: 100,
        })
    })

    it("deve atualizar o produto", async() => {
        const productRepository = new ProductRepository()
        const product = new Product("1", "produto 1", 100)
        await productRepository.create(product)

        product.changeName("novonome")
        product.changePrice(99.90)
        await productRepository.update(product)

        const productModel2 = await ProductModel.findOne({ where: {id: "1"}})
        expect(productModel2.toJSON()).toStrictEqual({
            id: "1",
            name: "novonome",
            price: 99.90,
        })
    })

    it("deve buscar um produto", async() => {
        const productRepository = new ProductRepository()
        const product = new Product("1", "produto 1", 100)
        await productRepository.create(product)

        const productModel = await ProductModel.findOne({ where: {id: "1"}})

        const foundProduct = await productRepository.find("1")

        expect(productModel.toJSON()).toStrictEqual({
            id: foundProduct.id,
            name: foundProduct.name,
            price: foundProduct.price,
        })
    })

    it("deve buscar todos os produtos", async() => {
        const productRepository = new ProductRepository()
        const product1 = new Product("1", "produto 1", 100)
        await productRepository.create(product1)
        const product2 = new Product("2", "produto 2", 170)
        await productRepository.create(product2)

        const foundProducts = await productRepository.findAll()
        const products = [product1, product2]

        expect(products).toEqual(foundProducts)
    })
})
