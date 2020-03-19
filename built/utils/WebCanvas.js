"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const canvas_1 = require("canvas");
class WebCanvas {
    constructor(opts) {
        this.width = opts.width || 250;
        this.height = opts.height || 250;
        this.canvas = canvas_1.createCanvas(this.width, this.height);
        // Setup Canvas High-DPI-like
        let dpr = opts.devicePixelRatio || 1;
        this.canvas.width = this.width * dpr;
        this.canvas.height = this.height * dpr;
        this.ctx = this.canvas.getContext('2d');
        this.ctx.scale(dpr, dpr);
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
