import { Canvas } from "./Canvas";
import V2 from "./math/V2";
import { createCanvas } from "canvas"

export class WebCanvas implements Canvas {
    width: number;
    height: number;

    private canvas;
    private ctx;

    public constructor(){
        this.canvas = createCanvas(250, 250);
        this.ctx = this.canvas.getContext('2d');
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