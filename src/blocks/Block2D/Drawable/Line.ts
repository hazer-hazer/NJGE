import { Drawable, DrawableOptions } from "./Drawable";
import V2 from "@utils/math/V2";
import Canvas from "@utils/Canvas";

export type LineOptions = DrawableOptions & {
    from: V2,
    to: V2
};

class Line extends Drawable {
    private from: V2;
    private to: V2;

    public constructor(opts: LineOptions) {
        super(opts);
        this.from = opts.from;
        this.to = opts.to;
    }

    public draw(canvas: Canvas) : void {
        console.log(`Draw line from ${this.from.add(this.position).asArray()} to ${this.to.add(this.position).asArray()}`)
        canvas.drawLine(this.from.add(this.position), this.to.add(this.position));
    }
}

export default Line