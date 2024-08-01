import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputUpdateProductDto, OutputUpdateProductDto } from "./update.product.dto";

export default class UpdateProductUseCase {
    constructor(private repository: ProductRepositoryInterface) {}

    async execute(input: InputUpdateProductDto): Promise<OutputUpdateProductDto> {
        const entity = await this.repository.find(input.id)
        entity.changeName(input.name)
        entity.changePrice(input.price)
        await this.repository.update(entity)
        return {
            id: entity.id,
            name: entity.name,
            price: entity.price,
        }
    }
}
