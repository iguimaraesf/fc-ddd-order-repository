import EventInterface from "../../@shared/event/event.interface";

export default class ProductCreatedEvent implements EventInterface {
    dateTimeOcurred: Date;
    eventData: ProductCreatedEventProps;
    
    constructor(eventData: ProductCreatedEventProps) {
        this.dateTimeOcurred = new Date()
        this.eventData = eventData
    }
}

export class ProductCreatedEventProps {
    id: string
    name: string
    price: number
}