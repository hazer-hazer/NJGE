import Block from "@blocks/Block";
import Canvas from "@utils/Canvas";
import { Drawable } from "@blocks/Block2D/Drawable/Drawable";
import { uuidv4 } from "uuid"
import { WebCanvas, CanvasOptions } from "@utils/WebCanvas";

export type Scenes = Map <string, Scene>;

export type SceneOptions = {
    name?: string;
    rootBlock: Block;
    canvasType?: string;
    canvas?: CanvasOptions;
}

export class Scene {
    private name: string;
    private noname: boolean;

    private rootBlock: Block;
    private canvas: Canvas;

    public constructor(opts?: SceneOptions){
        let canvas: Canvas;

        switch(opts.canvasType){
            case 'web':
            default:
                canvas = new WebCanvas(opts.canvas);
                break;
        }

        this.rename(opts.name)
            .setCanvas(canvas)
            .setRootBlock(opts.rootBlock);
    }

    public getName() : string {
        return this.name;
    }

    public getCanvas(): Canvas {
        return this.canvas;
    }

    public setCanvas(canvas: Canvas) : Scene {
        this.canvas = canvas;
        return this;
    }

    public setRootBlock(rootBlock: Block) : Scene {
        this.rootBlock = rootBlock;
        return this;
    }

    public rename(name?: string) : Scene {
        // Generate name for scene if it is not set
        if(!name){
            name = uuidv4();
            this.noname = true;
        }else{
            this.noname = false;
        }
        this.name = name;
        return this;
    }

    public draw() : Scene {
        this.canvas.clear();

        for(let block of this.rootBlock.getChildren().values()){
            if(block instanceof Drawable){                
                block.draw(this.canvas);
                block.drawChildren(this.canvas);
            }
        }

        return this;
    }
}