"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Drawable_1 = require("./Drawable");
class Line extends Drawable_1.Drawable {
    constructor(from, to) {
        super();
        this.from = from;
        this.to = to;
    }
    draw(canvas) {
        console.log(`Draw line from ${this.from.add(this.position).asArray()} to ${this.to.add(this.position).asArray()}`);
        canvas.drawLine(this.from.add(this.position), this.to.add(this.position));
    }
}
exports.default = Line;
