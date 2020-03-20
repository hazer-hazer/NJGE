import Events from "@utils/Events";
import { uuidv4 } from "uuid";

export type BlockOptions = {
	name?: string;
};

export type BlockChildren = Map <string, Block>;

export class Block implements Events.EventHandler {
	events: Events.EventMap = new Map<string, ((data?: any) => void)[]>();

	private name: string;

	private parent: Block;
	private children: BlockChildren = new Map <string, Block>();

	public constructor(opts?: BlockOptions){
		if(opts){
			this.name = opts.name || uuidv4();
		}
	}

	protected log(...messages: any[]) : void {
		console.log(`[${this.name.toUpperCase()}] ${messages.join(' ')}`);
	}

	public getName() : string {
		return this.name;
	}

	public getParent() : Block {
		return this.parent;
	}

	public getChildren() : BlockChildren {
		return this.children;
	}

	public findChild(path?: string) : Block {
		if(!path || path.length === 0){
			return this;
		}

		let pathEls = path.split('/');

		let firstChild = pathEls[0];
		if(!this.children.has(firstChild)){
			throw new Error(`Child ${firstChild} not found.`);
		}

		return this.children.get(firstChild).findChild(pathEls.slice(1).join());
	}

	public addChild(child: Block) : void {
		child.parent = this;
		this.children.set(child.getName(), child);
	}
        
	public on(name: string, method: (data?: any) => void) : void {
		let evArr = this.events.get(name) || [];
		evArr.push(method);
		this.events.set(name, evArr);
	}

	public trigger(name: string, data?: any) : void {
		let evArr = this.events.has(name) ? this.events.get(name) : [];
		for(let ev of evArr){
			ev.call(this, data);
		}
	}
}

export default Block;