import { GameEvent } from "../event";
import type { Game } from "@/lib/game";

export const goblinInvasion = (game: Game): GameEvent => {
  const event = new GameEvent({
    secondsToComplete: 1000,
    name: "Goblin Invasion",
    description: "A horde of goblins is attacking!",
    tickRate: 1000,
    game,
    onTrigger() {
      console.log("Goblin Invasion triggered!");
    },
  });

  event.addEvaluator({
    description: "Become strong enough to fend off the goblins.",
    requirement: "Player strength > 10",
    evaluator(game) {
      return game.player.strength > 10;
    },
  });

  return event;
};
