import { AggregateRoot } from "../domain/aggregate-root";
import EventDispatcherInterface from "./event-dispatcher.interface";
import EventHandlerInterface from "./event-handler.interface";
import EventInterface from "./event.interface";

export default class EventDispacher implements EventDispatcherInterface {
    private eventHandlers:  { [eventName: string]: EventHandlerInterface[] } = {}
    
    get getEventHandlers() {
        return this.eventHandlers
    }

    getHandlers(eventName: string): EventHandlerInterface<EventInterface>[] {
        return this.eventHandlers[eventName]
    }

    notify(event: EventInterface): void {
        const eventName = event.constructor.name
        const arr = this.eventHandlers[eventName]
        if (arr) {
            arr.forEach((eventHandler) => {
                eventHandler.handle(event)
            })
        }
    }

    notifyAll(object: AggregateRoot): void {
        const list = object.events
        list.forEach(ev => this.notify(ev))
    }

    register(eventName: string, eventHandler: EventHandlerInterface): void {
        if (!this.eventHandlers[eventName]) {
            this.eventHandlers[eventName] = []
        }
        // console.log(`*** REGISTRANDO O EVENTO ${eventName}. ***`)
        this.eventHandlers[eventName].push(eventHandler)
    }
    unregister(eventName: string, eventHandler: EventHandlerInterface): void {
        if (this.eventHandlers[eventName]) {
            const indx = this.eventHandlers[eventName].indexOf(eventHandler)
            if (indx != -1) {
                this.eventHandlers[eventName].splice(indx, 1)
            }
        }
    }
    unregisterAll(): void {
        this.eventHandlers = {}
    }
    
}