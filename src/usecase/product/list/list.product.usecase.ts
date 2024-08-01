import ProductInterface from "../../../domain/product/entity/product.interface";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputListProductDto, OutputListProductDto } from "./list.product.dto";

export default class ListProductUseCase {
    constructor(private repository: ProductRepositoryInterface) {}

    async execute(input: InputListProductDto): Promise<OutputListProductDto> {
        const entities = await this.repository.findAll()
        return OutputMapper.toOutput(entities)
    }
}

class OutputMapper {
    static toOutput(entities: ProductInterface[]): OutputListProductDto {
        return {
            products: entities.map((entity) => ({
                id: entity.id,
                name: entity.name,
                price: entity.price,
            }))
        }
    }
}
