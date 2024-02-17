import type { Unit, UnitActionBase } from "../unit";

export const punch: UnitActionBase = {
  name: "Punch",
  description: "A simple punch.",
  tteCoefficient: 1,
  category: {
    baseTTE: 1,
  },
  execute(user: Unit, target: Unit) {
    let damage = user.damage / 10;
    damage = Math.min(1, damage);
    target.health -= damage;
  }
};