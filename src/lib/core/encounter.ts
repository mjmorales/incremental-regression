import { actionReady, type NullableUnitAction, type Unit } from "./unit";

export class Party {
  units: Unit[] = [];

  addUnit(unit: Unit) {
    this.units.push(unit);
  }
}

const getHighestThreatUnit = (party: Party): Unit => {
  return party.units.reduce((highestThreatUnit, unit) => {
    if (unit.threat > highestThreatUnit.threat) {
      return unit;
    }
    return highestThreatUnit;
  });
}


const getActions = (party: Party): NullableUnitAction[] => {
  return party.units.map((unit) => unit.selectedAction);
}

const executeAction = (deltaTime: number, action: NullableUnitAction, enemyParty: Party) => {
  if (action === null) {
    return;
  }

  if (!actionReady(deltaTime, action)) {
    return;
  }

  const highestThreatUnit = getHighestThreatUnit(enemyParty);
  action.base.execute(action.user, highestThreatUnit);
  action.progress = 0;
}

export class Encounter {
  enemyParty: Party;
  playerParty: Party;

  constructor(playerParty: Party, enemyParty: Party) {
    this.playerParty = playerParty;
    this.enemyParty = enemyParty;
  }

  Tick(deltaTime: number) {
    const playerActions = getActions(this.playerParty);
    const enemyActions = getActions(this.enemyParty);
    playerActions.forEach((action) => executeAction(deltaTime, action, this.enemyParty));
    enemyActions.forEach((action) => executeAction(deltaTime, action, this.playerParty));
  }
}
