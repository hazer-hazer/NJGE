"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Drawable_1 = require("@blocks/Block2D/Drawable/Drawable");
class Engine {
    constructor(opts) {
        this.tickEvents = [];
        this.canvas = opts.canvas;
        this.rootBlock = opts.rootBlock;
        this.fps = opts.fps;
    }
    getCanvas() {
        return this.canvas;
    }
    draw() {
        this.canvas.clear();
        for (let block of this.rootBlock.getChildren()) {
            if (block instanceof Drawable_1.Drawable) {
                block.draw(this.canvas);
            }
        }
    }
    onTick(ev) {
        this.tickEvents.push(ev);
    }
    triggerTickEvents() {
        for (let f of this.tickEvents) {
            f.call(this, this.canvas);
        }
    }
    tick() {
        this.draw();
    }
    launch() {
        setInterval(() => {
            this.tick();
            this.triggerTickEvents();
        }, 1000 / this.fps);
    }
}
exports.default = Engine;
