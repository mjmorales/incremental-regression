export interface UnitActionCategory {
  baseTTE: number;
}

export interface UnitActionBase {
  name: string;
  description: string;
  tteCoefficient: number;
  category: UnitActionCategory;
  execute(user: Unit, target: Unit): void;
}

export interface UnitAction {
  user: Unit;
  secondsReadied: number;
  progress: number;
  base: UnitActionBase;
}

export type NullableUnitAction = UnitAction | null;

export const actionReady = (deltaTime: number, action: UnitAction): boolean => {
  action.secondsReadied += deltaTime / 1000;
  const tte = action.base.category.baseTTE * action.base.tteCoefficient;
  action.secondsReadied = Math.min(action.secondsReadied, tte);
  action.progress = Math.min(1, action.progress);
  return action.progress === 1;
}

export interface UnitOptions {
  name: string;
  damage: number;
  health: number;
  threat: number;
}

export class Unit {
  static actions: UnitAction[] = [];

  name: string;
  damage: number;
  health: number;
  threat: number;
  selectedAction: UnitAction | null = null;

  constructor(options: UnitOptions) {
    this.name = options.name;
    this.damage = options.damage;
    this.health = options.health;
    this.threat = options.threat;
  }

  selectAction(action: UnitAction): void {
    this.selectedAction = action;
  }
}