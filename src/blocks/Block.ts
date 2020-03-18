import Events from "@utils/Events";

class Block implements Events.EventHandler {
	events: Events.EventMap = new Map<string, ((data?: object) => void)[]>();

	private children: Block[];

	public constructor(){
		this.events;
		this.children = [];
	}

	public getName() : string {
		return Block.name;	
	}

	public getChildren() : Block[] {
		return this.children;
	}

	public addChildren(child: Block) : void {
		this.children.push(child);
	}
        
	public on(name: string, method: (data?: object) => void) : void {
		let evArr = this.events.get(name) || [];
		evArr.push(method);
		this.events.set(name, evArr);
	}

	public trigger(name: string, data?: object) : void {
		let evArr = this.events.has(name) ? this.events.get(name) : [];
		for(let ev of evArr){
			ev.call(this, data);
		}
	}
}

export default Block;