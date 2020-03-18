"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Block {
    constructor() {
        this.events = new Map();
        this.events;
        this.children = [];
    }
    getName() {
        return Block.name;
    }
    getChildren() {
        return this.children;
    }
    addChildren(child) {
        this.children.push(child);
    }
    on(name, method) {
        let evArr = this.events.get(name) || [];
        evArr.push(method);
        this.events.set(name, evArr);
    }
    trigger(name, data) {
        let evArr = this.events.has(name) ? this.events.get(name) : [];
        for (let ev of evArr) {
            ev.call(this, data);
        }
    }
}
exports.default = Block;
