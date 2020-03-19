namespace Events{

    export type EventMap = Map <string, ((data?: object) => void)[]>;
    
    export interface EventHandler{
        events: EventMap;
        
        on(name: string, method: Function) : void;
        trigger(name: string) : void;
    }
}

export default Events