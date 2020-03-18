import Block from '@blocks/Block';
import V2 from '@math/V2';

class Block2D extends Block {
    protected position: V2;

    public constructor(v ?: V2){
        super();
        this.position = v || new V2(0, 0);
    }

    public getPosition() : V2 {
        return this.position;
    }

    public setPosition(x: number | V2, y?: number) : Block2D {
        let v: V2;
        if(typeof x === 'number' && y){
            v = new V2(x, y);
        }else if(x instanceof V2){
            v = x;
        }
        this.position = v;
        this.trigger('positionChanged', this.position);
        return this;
    }

    public move(x: number | V2, y?: number) : Block2D {
        let v: V2;
        if(typeof x === 'number' && y){
            v = new V2(x, y);
        }else if(x instanceof V2){
            v = x;
        }
        this.position = this.position.add(v);
        this.trigger('moved', this.position);

        return this;
    }
}

export default Block2D