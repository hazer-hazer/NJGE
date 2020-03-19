import Canvas from "./Canvas";
import V2 from "./math/V2";
import { createCanvas } from "canvas"

export type CanvasOptions = {
    width: number;
    height: number;

    devicePixelRatio?: number;
};

export class WebCanvas implements Canvas {
    width: number;
    height: number;

    private canvas;
    private ctx;

    public constructor(opts?: CanvasOptions){
        this.width = opts.width || 250;
        this.height = opts.height || 250;

        this.canvas = createCanvas(this.width, this.height);

        // Setup Canvas High-DPI-like
        let dpr = opts.devicePixelRatio || 1;
        this.canvas.width = this.width * dpr;
        this.canvas.height = this.height * dpr;

        this.ctx = this.canvas.getContext('2d');
        this.ctx.scale(dpr, dpr);
    }

    public clear() : void {
        this.ctx.clearRect(0, 0, this.width, this.height);
    }

    public drawLine(from: V2, to: V2) : void {
        this.ctx.strokeStyle = '#ffffff'
        this.ctx.beginPath();
        this.ctx.moveTo(from.x, from.y);
        this.ctx.lineTo(to.x, to.y);
        this.ctx.stroke();
    }

    public toBuffer(mimeType?: string, config?: any) : Buffer {
        return this.canvas.toBuffer(mimeType, config);
    }
}