import Events from "@utils/Events";
import { uuidv4 } from "uuid";

export type BlockOptions = {
	name?: string;
};

export class Block implements Events.EventHandler {
	events: Events.EventMap = new Map<string, ((data?: object) => void)[]>();

	private name: string;

	private parent: Block;
	private children: Block[];

	public constructor(opts?: BlockOptions){
		if(opts){
			this.name = opts.name || uuidv4();
		}

		this.events;
		this.children = [];
	}

	public getName() : string {
		return Block.name;	
	}

	public getParent() : Block {
		return this.parent;
	}

	public getChildren() : Block[] {
		return this.children;
	}

	public findChildren(name: string) : Block {
		return this.children.find(c => c.name === name);
	}

	public addChild(child: Block) : void {
		child.parent = this;
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