import Entity from "../../@shared/entity/entity.abstract";

export default abstract class ProductInterface extends Entity {
    abstract get id(): string
    abstract get name(): string
    abstract get price(): number
    abstract changeName(name: string): void
    abstract changePrice(v: number): void
}