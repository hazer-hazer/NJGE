import { Canvas } from "@utils/Canvas";
import Block from "@blocks/Block";
import { Drawable } from "@blocks/Block2D/Drawable/Drawable";
import Events from "@utils/Events";
import { performance } from "perf_hooks"

type EngineOptions = {
    canvas: Canvas;
    rootBlock: Block;
    fps: number;
}

class Engine {
    private canvas: Canvas;
    private rootBlock: Block;

    private fps: number;

    private tickEvents: Function[] = [];

    public constructor(opts: EngineOptions) {
        this.canvas = opts.canvas;
        this.rootBlock = opts.rootBlock;

        this.fps = opts.fps;
    }

    public getCanvas(){
        return this.canvas;
    }

    public draw() : void {
        this.canvas.clear();

        for(let block of this.rootBlock.getChildren()){
            if(block instanceof Drawable){
                block.draw(this.canvas);
            }
        }
    }

    public onTick(ev: Function) : void{
        this.tickEvents.push(ev);
    }

    public triggerTickEvents() : void {
        for(let f of this.tickEvents){
            f.call(this, this.canvas);
        }
    }

    public tick() : void {
        this.draw();
    }

    public launch() : void {
        setInterval(() => {
            this.tick();
            this.triggerTickEvents();
        }, 1000 / this.fps);
    }
}

export default Engine