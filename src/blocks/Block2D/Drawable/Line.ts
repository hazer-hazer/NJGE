import { Drawable } from "./Drawable";
import V2 from "@utils/math/V2";
import Canvas from "@utils/Canvas";

class Line extends Drawable {
    private from: V2;
    private to: V2;

    public constructor(from: V2, to: V2) {
        super();
        this.from = from;
        this.to = to;
    }

    public draw(canvas: Canvas) : void {
        console.log(`Draw line from ${this.from.add(this.position).asArray()} to ${this.to.add(this.position).asArray()}`)
        canvas.drawLine(this.from.add(this.position), this.to.add(this.position));
    }
}

export default Line