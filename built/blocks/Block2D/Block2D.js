"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Block_1 = require("@blocks/Block");
const V2_1 = require("@math/V2");
class Block2D extends Block_1.default {
    constructor(v) {
        super();
        this.position = v || new V2_1.default(0, 0);
    }
    getPosition() {
        return this.position;
    }
    setPosition(x, y) {
        let v;
        if (typeof x === 'number' && y) {
            v = new V2_1.default(x, y);
        }
        else if (x instanceof V2_1.default) {
            v = x;
        }
        this.position = v;
        this.trigger('PositionChanged', this.position);
        return this;
    }
    move(x, y) {
        let v;
        if (typeof x === 'number' && y) {
            v = new V2_1.default(x, y);
        }
        else if (x instanceof V2_1.default) {
            v = x;
        }
        this.position = this.position.add(v);
        this.trigger('Moved', this.position);
        return this;
    }
}
exports.default = Block2D;