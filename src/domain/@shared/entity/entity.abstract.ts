import { AggregateRoot } from "../domain/aggregate-root"
import Notification from "../notification/notification"

export default abstract class Entity extends AggregateRoot{
    protected _id: string
    public notification: Notification

    constructor() {
        super()
        this.notification = new Notification()
    }
}