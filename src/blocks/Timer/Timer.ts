import Block from "@blocks/Block";

export type TimerOptions = {
    interval: number;
    iterations?: number;

    startOnCreate?: boolean;
};

export class Timer extends Block {
    private interval: number;
    private iterations: number;

    private lastIteration: number;
    private intervalRef;

    public constructor(opts: TimerOptions){
        super();

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
            this.trigger('elapsed');
            if(++this.lastIteration > this.iterations){
                this.stop();
            }
        }, this.interval);
    }
}