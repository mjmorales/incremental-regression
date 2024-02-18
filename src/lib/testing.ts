import { punch } from "./core/actions/combat";
import { Party, Encounter } from "./core/encounter";
import { Unit } from "./core/unit";
import type { Game } from "./game";

export const fightGoblinParty = (game: Game) => {
  const goblin = new Unit({
    name: "Goblin",
    intelligence: 1,
    strength: 2,
    health: 20,
    threat: 1,
    speed: 10,
  });

  goblin.addAction(punch)

  const goblinParty = new Party();
  goblinParty.addUnit(goblin);

  const playerParty = new Party();
  playerParty.addUnit(...game.playerUnits);

  const encounter = new Encounter(playerParty, goblinParty);
  return encounter;
}
