import Events from "@utils/Events";

class Block implements Events.EventHandler {
	events: Events.EventMap;

	public constructor(){
		this.events = new Map<string, ((data?: object) => void)[]>();
	}

	public getName() : string {
		return Block.name;	
	}

	public on(name: string, method: (data?: object) => void) : void {
		let evArr = this.events.get(name) || [];
		evArr.push(method);
		this.events.set(name, evArr);
	}

	public trigger(name: string, data?: object) : void {
		for(let ev of this.events.get(name)){
			ev.call(this, data);
		}
	}
}

export default Block;