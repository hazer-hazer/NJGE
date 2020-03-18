"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const canvas_1 = require("canvas");
class WebCanvas {
    constructor() {
        this.canvas = canvas_1.createCanvas(250, 250);
        this.ctx = this.canvas.getContext('2d');
    }
    clear() {
        this.ctx.clearRect(0, 0, this.width, this.height);
    }
    drawLine(from, to) {
        this.ctx.strokeStyle = '#ffffff';
        this.ctx.beginPath();
        this.ctx.moveTo(from.x, from.y);
        this.ctx.lineTo(to.x, to.y);
        this.ctx.stroke();
    }
    toBuffer(mimeType, config) {
        return this.canvas.toBuffer(mimeType, config);
    }
}
exports.WebCanvas = WebCanvas;
