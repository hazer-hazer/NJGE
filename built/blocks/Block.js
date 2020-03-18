"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Block {
    constructor() {
        this.events = new Map();
    }
    getName() {
        return Block.name;
    }
    on(name, method) {
        let evArr = this.events.get(name) || [];
        evArr.push(method);
        this.events.set(name, evArr);
    }
    trigger(name, data) {
        for (let ev of this.events.get(name)) {
            ev.call(this, data);
        }
    }
}
exports.default = Block;
