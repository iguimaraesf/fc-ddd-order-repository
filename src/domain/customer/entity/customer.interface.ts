import Entity from "../../@shared/entity/entity.abstract";
import Address from "../value-object/address";

export abstract class CustomerInterface extends Entity {
    abstract changeName(name: string): void
    abstract changeAddress(address: Address): void
    abstract defineAddress(address: Address): void
    abstract addRewardPoints(rewardPoints: number): void
    abstract activate(): void
    abstract isActive(): boolean
    abstract get id(): string
    abstract get name(): string
    abstract get address(): Address
    abstract get active(): boolean
    abstract get rewardPoints(): number
    abstract deactivate(): void
}