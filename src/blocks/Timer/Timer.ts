import Block, { BlockOptions } from "@blocks/Block";

export type TimerOptions = BlockOptions & {
    interval: number;
    iterations?: number;

    startOnCreate?: boolean;
};

export class Timer extends Block {
    private interval: number;
    private iterations: number;

    private lastIteration: number;
    private intervalRef;

    public constructor(opts?: TimerOptions){
        super(opts);

        this.interval = opts.interval;
        this.iterations = opts.iterations || 1;
        this.lastIteration = 0;

        if(opts.startOnCreate){
            this.start();
        }
    }

    public stop() : void {
        clearInterval(this.intervalRef);
    }

    public start() : void {
        this.intervalRef = setInterval(() => {
            this.trigger('elapsed', this.getParent());
            console.log(`Timer iteration ${this.lastIteration} when max iterations ${this.iterations}`)
            if(++this.lastIteration > this.iterations){
                this.stop();
            }
        }, this.interval);
    }
}