export type UpdateFunction = (deltaTime: number) => void;

export class Ticker {
    private updateQueue: UpdateFunction[] = [];
    private callbacks: (() => void)[] = [];
    private lastTick: number = Date.now();
    private tickRate: number;
    private intervalId: number | null = null;

    constructor(tickRate: number) {
        this.tickRate = tickRate;
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
        const now = Date.now();
        const deltaTime = now - this.lastTick;
        this.lastTick = now;
        for (const updateFunction of this.updateQueue) {
            updateFunction(deltaTime);
        }
        for (const callback of this.callbacks) {
            callback();
        }
    }

    addUpdateFunction(updateFunction: UpdateFunction): void {
        this.updateQueue.push(updateFunction);
    }

    addCallback(callback: () => void): void {
        this.callbacks.push(callback);
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
