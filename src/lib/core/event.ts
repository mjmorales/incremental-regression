import type { Game } from "../game";
import { Ticker } from "./ticker";

export type evaluatorFn = (game: Game) => boolean;
export interface Evaluator {
  description: string;
  requirement: string;
  evaluator: evaluatorFn;
}

export interface GameEventOptions {
  name: string;
  description: string;
  tickRate: number;
  game: Game;
  secondsToComplete: number;
  onTrigger: () => void;
}

export class GameEvent {
  name: string;
  description: string;
  secondsToComplete: number;
  evaluators: Evaluator[] = [];

  private onTrigger: () => void;
  private ticker: Ticker;

  constructor(options: GameEventOptions) {
    this.name = options.name;
    this.description = options.description;
    this.onTrigger = options.onTrigger;
    this.secondsToComplete = options.secondsToComplete;
    this.ticker = new Ticker(
      options.tickRate,
      () => this.satisfied(options.game)
    );
  }

  trigger(): void {
    this.onTrigger();
  }

  addEvaluator(evaluator: Evaluator): void {
    this.evaluators.push(evaluator);
  }

  satisfied(game: Game): boolean {
    return this.evaluators.every((evaluator) => evaluator.evaluator(game));
  }

  start(): void {
    this.ticker.addUpdateFunction((deltaTime) => {
      this.secondsToComplete -= 1000 / deltaTime;
      console.log(this.secondsToComplete);
    });

    this.ticker.start();
  }
}