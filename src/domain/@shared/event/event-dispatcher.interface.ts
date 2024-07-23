import { AggregateRoot } from "../domain/aggregate-root";
import EventHandlerInterface from "./event-handler.interface";
import EventInterface from "./event.interface";

export default interface EventDispatcherInterface {
    notify(event: EventInterface): void
    notifyAll(object: AggregateRoot): void
    getHandlers(name: string): EventHandlerInterface<EventInterface>[]
    register(eventName: string, eventHandler: EventHandlerInterface): void
    unregister(eventName: string, eventHandler: EventHandlerInterface): void
    unregisterAll(): void
}