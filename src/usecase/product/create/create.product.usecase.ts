import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputCreateProductDto, OutputCreateProductDto } from "./create.product.dto";

export default class CreateProductUseCase {
    constructor(private repository: ProductRepositoryInterface) {}

    async execute(input: InputCreateProductDto): Promise<OutputCreateProductDto> {
        const entity = ProductFactory.create("a", input.name, input.price)
        await this.repository.create(entity)
        return {
            id: entity.id,
            name: entity.name,
            price: entity.price,
        }
    }
}
