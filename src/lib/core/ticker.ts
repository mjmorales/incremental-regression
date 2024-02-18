export type UpdateFunction = (deltaTime: number) => void;

export class Ticker {
    private updateQueue: UpdateFunction[] = [];
    private callbacks: (() => void)[] = [];
    private lastTick: number = Date.now();
    private tickRate: number;
    private intervalId: number | null = null;
    private stopIf: () => boolean;
    private ticking: boolean = false;
    private stopCallbacks: (() => void)[] = [];

    constructor(tickRate: number, stopIf: () => boolean = () => false) {
        this.tickRate = tickRate;
        this.stopIf = stopIf;
    }

    start(): void {
      this.lastTick = Date.now();
      this.intervalId = setInterval(() => this.tick(), this.tickRate);
    }

    stop(): void {
        if (this.intervalId !== null) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }

    private tick(): void {
        if (this.ticking) {
            return;
        }

        this.ticking = true;

        const now = Date.now();
        const deltaTime = now - this.lastTick;
        this.lastTick = now;
        for (const updateFunction of this.updateQueue) {
            updateFunction(deltaTime);
        }
        for (const callback of this.callbacks) {
            callback();
        }
        if (this.stopIf()) {
            this.stop();
            for (const stopCallback of this.stopCallbacks) {
                stopCallback();
            }
        }

        this.ticking = false;
    }

    addUpdateFunction(updateFunction: UpdateFunction): void {
        this.updateQueue.push(updateFunction);
    }

    addCallback(callback: () => void): void {
        this.callbacks.push(callback);
    }

    addStopCallback(callback: () => void): void {
        this.stopCallbacks.push(callback);
    }

    setTickRate(newTickRate: number): void {
        this.tickRate = newTickRate;
        if (this.getIntervalId() !== null) {
            this.stop();
            this.start();
        }
    }
  
  getIntervalId(): number | null {
    return this.intervalId;
  }
}
