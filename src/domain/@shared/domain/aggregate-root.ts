import EventInterface from "../event/event.interface";

export abstract class AggregateRoot {
    events: Set<EventInterface> = new Set()

    // ...sometimes raiseEvent(...)
    addEvent(event: EventInterface){
        this.events.add(event)
    }   

    clearEvents(){
        this.events.clear()
    }
}
