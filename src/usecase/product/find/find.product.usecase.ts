import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputFindProductDto, OutputFindProductDto } from "./find.product.dto";

export default class FindProductUseCase {
    constructor(private repository: ProductRepositoryInterface) {}

    async execute(input: InputFindProductDto): Promise<OutputFindProductDto> {
        const entity = await this.repository.find(input.id)
        return {
            id: entity.id,
            name: entity.name,
            price: entity.price,
        }
    }
}
