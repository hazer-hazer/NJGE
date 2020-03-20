"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Block2D_1 = require("../Block2D");
class Drawable extends Block2D_1.Block2D {
    constructor(opts) {
        super(opts);
    }
    draw(canvas) {
        this.log(`Draw Method is not realized`);
    }
    drawChildren(canvas) {
        for (let c of this.getChildren()) {
            if (c instanceof Drawable) {
                c.draw(canvas);
            }
        }
    }
}
exports.Drawable = Drawable;
