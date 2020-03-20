"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
class Block {
    constructor(opts) {
        this.events = new Map();
        this.children = new Map();
        if (opts) {
            this.name = opts.name || uuid_1.uuidv4();
        }
    }
    log(...messages) {
        console.log(`[${this.name.toUpperCase()}] ${messages.join(' ')}`);
    }
    getName() {
        return this.name;
    }
    getParent() {
        return this.parent;
    }
    getChildren() {
        return this.children;
    }
    findChild(path) {
        if (!path || path.length === 0) {
            return this;
        }
        let pathEls = path.split('/');
        let firstChild = pathEls[0];
        if (!this.children.has(firstChild)) {
            throw new Error(`Child ${firstChild} not found.`);
        }
        return this.children.get(firstChild).findChild(pathEls.slice(1).join());
    }
    addChild(child) {
        child.parent = this;
        this.children.set(child.getName(), child);
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
