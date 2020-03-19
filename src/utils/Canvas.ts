import V2 from "./math/V2";

interface Canvas {
    width: number;
    height: number;

    clear() : void;
    
    drawLine(from: V2, to: V2) : void;


    toBuffer(mimeType?: string, config?: any) : Buffer;
}

export default Canvas;