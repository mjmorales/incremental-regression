import type { Unit, UnitActionBase } from "../unit";

export interface CombatEvent {
  user: Unit;
  target: Unit;
  action: UnitActionBase;
  description: string;
  type: "damage" | "heal";
  acknowledged?: boolean;
}

export const CategoryPhysical = {
  baseTTE: 1,
};

export const CategoryMagical = {
  baseTTE: 1,
};

export const punch: UnitActionBase = {
  name: "Punch",
  description: "A simple punch.",
  tteDivisor: 100,
  category: CategoryPhysical,
  execute(user: Unit, target: Unit) {
    let damage = user.strength / 10;
    damage = Math.max(1, damage);
    target.health -= damage;

    return {
      user,
      target,
      action: this,
      description: `${user.name} punched for ${damage} damage.`,
      type: "damage",
    };
  }
};

export const heal: UnitActionBase = {
  name: "Heal",
  description: "Heal yourself.",
  tteDivisor: 100,
  category: CategoryMagical,
  execute(user: Unit, target: Unit) {
    let heal = user.intelligence / 10;
    heal = Math.max(1, heal);
    user.health += heal;

    return {
      user,
      target: user,
      action: this,
      description: `${user.name} healed for ${heal} health.`,
      type: "heal",
    };
  }
};