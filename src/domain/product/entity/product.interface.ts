import { AggregateRoot } from "../../@shared/domain/aggregate-root";
import EventInterface from "../../@shared/event/event.interface"

export default abstract class ProductInterface extends AggregateRoot {
    abstract get id(): string
    abstract get name(): string
    abstract get price(): number
    abstract changeName(name: string): void
    abstract changePrice(v: number): void
}