import { useCombatEvents } from "@/stores/combat";
import { Ticker } from "./ticker";
import { actionReady, type Unit, type UnitAction } from "./unit";

export class Party {
  units: Unit[] = [];

  addUnit(...units: Unit[]) {
    this.units.push(...units);
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


const getActions = (party: Party): UnitAction[] => {
  return party.units.flatMap((unit) => unit.actions);
}

const executeAction = (deltaTime: number, action: UnitAction, enemyParty: Party) => {
  if (action === null) {
    return;
  }

  if (!actionReady(deltaTime, action)) {
    return;
  }


  const eventLog = useCombatEvents();

  const highestThreatUnit = getHighestThreatUnit(enemyParty);
  const event = action.base.execute(action.user, highestThreatUnit);
  eventLog.addEvent(event);

  action.progress = 0;
  action.secondsReadied = 0;
}

export class Encounter {
  enemyParty: Party;
  playerParty: Party;
  private ticker?: Ticker;

  constructor(playerParty: Party, enemyParty: Party) {
    this.playerParty = playerParty;
    this.enemyParty = enemyParty;
  }

  tick(deltaTime: number) {
    const playerActions = getActions(this.playerParty);
    const enemyActions = getActions(this.enemyParty);
    playerActions.forEach((action) => executeAction(deltaTime, action, this.enemyParty));
    enemyActions.forEach((action) => executeAction(deltaTime, action, this.playerParty));
  }

  complete() {
    const hasLiveUnits = (party: Party) => party.units.some((unit) => unit.health > 0);
    const playerUnitsAlive = hasLiveUnits(this.playerParty);
    const enemyUnitsAlive = hasLiveUnits(this.enemyParty);
    return !playerUnitsAlive || !enemyUnitsAlive;
  }


  Start() {
    const eventLog = useCombatEvents();
    this.ticker = new Ticker(200, () => this.complete());
    this.ticker.addUpdateFunction((deltaTime) => this.tick(deltaTime));
    this.ticker.addStopCallback(() => eventLog.clearEvents())
    this.ticker.start();
  }
}
