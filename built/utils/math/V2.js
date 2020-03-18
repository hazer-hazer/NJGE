"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class V2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    getLength() {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    }
    setLength(length) {
        let angle = this.getAngle();
        this.x = Math.cos(angle) * length;
        this.y = Math.sin(angle) * length;
        return this;
    }
    getAngle() {
        return Math.atan2(this.y, this.x);
    }
    setAngle(angle) {
        let length = this.getLength();
        this.x = Math.cos(angle) * length;
        this.y = Math.sin(angle) * length;
        return this;
    }
    add(v) {
        if (typeof v === 'number')
            return new V2(this.x + v, this.y + v);
        else
            return new V2(this.x + v.x, this.y + v.y);
    }
    sub(v) {
        if (typeof v === 'number')
            return new V2(this.x - v, this.y - v);
        else
            return new V2(this.x - v.x, this.y - v.y);
    }
    mult(v) {
        if (typeof v === 'number')
            return new V2(this.x * v, this.y * v);
        else
            return new V2(this.x * v.x, this.y * v.y);
    }
    div(v) {
        if (typeof v === 'number')
            return new V2(this.x / v, this.y / v);
        else
            return new V2(this.x / v.x, this.y / v.y);
    }
    asArray() {
        return [this.x, this.y];
    }
}
exports.default = V2;
