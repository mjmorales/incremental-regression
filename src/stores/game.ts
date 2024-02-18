import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { Game } from '@/lib/game'
import { fightGoblinParty } from '@/lib/testing';
import type { GameEvent } from '@/lib/core/event';
import { goblinInvasion } from '@/lib/core/events/required';


const game = ref(new Game())
const gameEvents = ref<GameEvent[]>([])

export const useGameStore = defineStore('game', () => {
  const player = computed(() => game.value.player)
  const playerUnits = computed(() => game.value.playerUnits)
  const resources = computed(() => game.value.resources)
  const activeEncounter = computed(() => game.value.activeEncounter)

  return {
    activeEncounter,
    game,
    player,
    playerUnits,
    resources,
  }
});


export const useGameEvents = defineStore('gameEvents', () => {
  return {
    gameEvents,
  }
});

const goblinInvasionEvent = goblinInvasion(game.value as Game)
game.value.activeEncounter = fightGoblinParty(game.value as Game)
gameEvents.value.push(goblinInvasionEvent)
goblinInvasionEvent.start()
