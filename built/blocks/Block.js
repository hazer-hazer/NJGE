"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
class Block {
    constructor(opts) {
        this.events = new Map();
        if (opts) {
            this.name = opts.name || uuid_1.uuidv4();
        }
        this.events;
        this.children = [];
    }
    getName() {
        return Block.name;
    }
    getParent() {
        return this.parent;
    }
    getChildren() {
        return this.children;
    }
    findChildren(name) {
        return this.children.find(c => c.name === name);
    }
    addChild(child) {
        child.parent = this;
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
exports.Block = Block;
exports.default = Block;
