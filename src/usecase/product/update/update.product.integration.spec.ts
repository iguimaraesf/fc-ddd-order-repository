import { Sequelize } from "sequelize-typescript"
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model"
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository"
import ProductFactory from "../../../domain/product/factory/product.factory"
import FindProductUseCase from "../find/find.product.usecase"

describe("Test update product usecase", () => {
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

    it("should update a product", async () => {
        const repository = new ProductRepository()
        const entity = ProductFactory.create("a", "Product 123", 2.29)
        await repository.create(entity)

        entity.changeName("new name")
        entity.changePrice(1.99)
        await repository.update(entity)

        const input = {
            id: entity.id,
        }
        const usecase = new FindProductUseCase(repository)
        const output = await usecase.execute(input)
        const expected = {
            id: entity.id,
            name: entity.name,
            price: entity.price,
        }
        expect(output).toEqual(expected)
    })

})
