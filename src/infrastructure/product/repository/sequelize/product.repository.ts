import ProductInterface from "../../../../domain/product/entity/product.interface";
import ProductFactory from "../../../../domain/product/factory/product.factory";
import ProductRepositoryInterface from "../../../../domain/product/repository/product-repository.interface";
import ProductModel from "./product.model";

export default class ProductRepository implements ProductRepositoryInterface {
    async create(entity: ProductInterface): Promise<void> {
        try {
            await ProductModel.create({
                id: entity.id,
                name: entity.name,
                price: entity.price,
            })
        } catch (error) {
            console.log(error)
            throw error
        }
    }
    async update(entity: ProductInterface): Promise<void> {
        await ProductModel.update({
            name: entity.name,
            price: entity.price,
        },{
            where: {
                id: entity.id
            }
        })
    }
    async find(id: string): Promise<ProductInterface> {
        const productModel = await ProductModel.findOne({
            where: {
                id: id,
            }
        })
        return ProductFactory.newInstance("a",
            productModel.id,
            productModel.name,
            productModel.price,
        )
    }
    async findAll(): Promise<ProductInterface[]> {
        const productModels = await ProductModel.findAll()
        return productModels.map(productModel => 
            ProductFactory.newInstance("a", productModel.id, productModel.name, productModel.price)
        )
    }

}
