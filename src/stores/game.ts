import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { Game } from '@/lib/game'
import { fightGoblinParty } from '@/lib/testing';

const game = ref(new Game())

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

game.value.activeEncounter = fightGoblinParty(game.value)