import { Sequelize } from "sequelize-typescript"
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model"
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository"
import ProductFactory from "../../../domain/product/factory/product.factory"
import FindProductUseCase from "../find/find.product.usecase"
import ListProductUseCase from "./list.product.usecase"

describe("Test list products usecase", () => {
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

    it("should list all products", async () => {
        const repository = new ProductRepository()
        const entity1 = ProductFactory.create("a", "Product 123", 2.29)
        await repository.create(entity1)
        const entity2 = ProductFactory.create("a", "Product 456", 7.75)
        await repository.create(entity2)

        const input = {}
        const usecase = new ListProductUseCase(repository)
        const output = await usecase.execute(input)
        const expected = {
            products: [
                {
                    id: entity1.id,
                    name: entity1.name,
                    price: entity1.price,
                },
                {
                    id: entity2.id,
                    name: entity2.name,
                    price: entity2.price,
                },
            ],
        }
        expect(output).toEqual(expected)
    })

})
