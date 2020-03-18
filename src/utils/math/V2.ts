class V2 {
	public x: number;
	public y: number;

	constructor(x: number, y: number){
		this.x = x;
		this.y = y;
	}

	public getLength() : number {
		return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
	}

	public setLength(length : number) : V2 {
		let angle = this.getAngle();
		this.x = Math.cos(angle) * length;
		this.y = Math.sin(angle) * length;

		return this;
	}

	public getAngle() : number {
		return Math.atan2(this.y, this.x);
	}

	public setAngle(angle : number) : V2 {
		let length = this.getLength();
		this.x = Math.cos(angle) * length;
		this.y = Math.sin(angle) * length;

		return this;
	}

	public add(v : V2 | number) : V2 {
		if(typeof v === 'number')
			return new V2(this.x + v, this.y + v);
		else
			return new V2(this.x + v.x, this.y + v.y);
	}
	
	public sub(v : V2 | number) : V2 {
		if(typeof v === 'number')
			return new V2(this.x - v, this.y - v);
		else
			return new V2(this.x - v.x, this.y - v.y);
	}

	public mult(v : V2 | number) : V2 {
		if(typeof v === 'number')
			return new V2(this.x * v, this.y * v);
		else
			return new V2(this.x * v.x, this.y * v.y);
	}

	public div(v : V2 | number) : V2 {
		if(typeof v === 'number')
			return new V2(this.x / v, this.y / v);
		else
			return new V2(this.x / v.x, this.y / v.y);
	}

	public asArray() : number[] {
		return [ this.x, this.y ];
	}
}

export default V2