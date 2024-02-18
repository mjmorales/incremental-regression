import { heal, punch } from "./core/actions/combat";
import type { Encounter } from "./core/encounter";
import type { TickableResource } from "./core/resource";
import { Unit } from "./core/unit";

export interface ResourceMap {
  [key: string]: TickableResource;
}

export interface SavedGame {
  resources: ResourceMap;
  player: Unit;
  playerUnits: Unit[];
  activeEncounter?: Encounter;
}

export class Game {
  resources: ResourceMap = {};
  player: Unit;
  playerUnits: Unit[] = [];
  activeEncounter?: Encounter;

  constructor(savedGame?: SavedGame) {
    if (savedGame) {
      this.resources = savedGame.resources;
      this.player = savedGame.player;
      this.playerUnits = savedGame.playerUnits;
      this.activeEncounter = savedGame.activeEncounter;

      return;
    }

    this.resources = {};
    this.player = new Unit({
      name: "Player",
      strength: 1,
      health: 20,
      threat: 1,
      speed: 5,
      intelligence: 5,
      actionLimit: 2,
    });

    this.player.addAction(punch);
    this.player.addAction(heal);

    this.playerUnits = [this.player];
  }
}
