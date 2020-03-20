import { Block2D, Block2DOptions } from "../Block2D";
import Canvas from "@utils/Canvas";

export type DrawableOptions = Block2DOptions & {
    
};

export class Drawable extends Block2D {

    public constructor(opts?: DrawableOptions) {
        super(opts);
    }
    
    public draw(canvas: Canvas) : void {
        this.log(`Draw Method is not realized`);
    }

    public drawChildren(canvas: Canvas) : void {
        for(let c of this.getChildren()){
            if(c instanceof Drawable){
                c.draw(canvas);
            }
        }
    }
}