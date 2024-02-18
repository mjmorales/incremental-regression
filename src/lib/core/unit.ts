import type { CombatEvent } from "./actions/combat";

export interface UnitActionCategory {
  baseTTE: number;
}

export interface UnitActionBase {
  name: string;
  description: string;
  // tteDivisor is a speed divisor for the action
  // the higher the tteDivisor, the slower the action
  tteDivisor: number;
  category: UnitActionCategory;
  execute(user: Unit, target: Unit): CombatEvent;
}

export interface UnitAction {
  user: Unit;
  secondsReadied: number;
  progress: number;
  base: UnitActionBase;
}

export const actionReady = (deltaTime: number, action: UnitAction): boolean => {
  action.secondsReadied += deltaTime / 1000;

  const adjustedSpeed = action.user.speed / action.base.tteDivisor;
  const tte = action.base.category.baseTTE * adjustedSpeed;
  action.progress = action.secondsReadied * tte;

  return action.progress >= 1;
}

export interface UnitOptions {
  name: string;
  health: number;
  threat: number;
  speed: number;
  intelligence: number;
  strength: number;
  actionLimit?: number;
}

export class Unit {
  name: string;
  strength: number;
  health: number;
  threat: number;
  speed: number;
  actionLimit: number = 1;
  actionList: UnitAction[] = [];
  intelligence: number;
  private id: string = Math.random().toString(36);

  constructor(options: UnitOptions) {
    this.name = options.name;
    this.strength = options.strength;
    this.health = options.health;
    this.threat = options.threat;
    this.speed = options.speed;
    this.intelligence = options.intelligence;
    this.actionLimit = options.actionLimit || this.actionLimit;
  }

  addAction(action: UnitActionBase): void {
    if (this.actions.length >= this.actionLimit) {
      return;
    }

    const user = this;
    const secondsReadied = 0;
    const progress = 0;
    const newAction: UnitAction = {
      user,
      secondsReadied,
      progress,
      base: action,
    };

    this.actionList.push(newAction);
  }

  get actions(): UnitAction[] {
    return this.actionList;
  }

  getId(): string {
    return this.id;
  }
}