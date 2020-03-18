import Block2D from "../Block2D";
import { Canvas } from "@utils/Canvas";

export abstract class Drawable extends Block2D {
    
    public abstract draw(canvas: Canvas) : void;

    public drawChildren(canvas: Canvas) : void {
        for(let c of this.getChildren()){
            if(c instanceof Drawable){
                c.draw(canvas);
            }
        }
    }
}