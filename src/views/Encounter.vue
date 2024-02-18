<script setup lang="ts">
import { ref, onMounted, watch, type Ref } from 'vue';
import { useCombatEvents } from '@/stores/combat';
import { useGameStore } from '@/stores/game';
import UnitCard from '@/components/encounters/UnitCard.vue';


const gameStore = useGameStore();
const combatEventsStore = useCombatEvents();

const activeEncounter = gameStore.activeEncounter;

onMounted(() => {
  activeEncounter?.Start();
});

// A reactive property to track the status classes for each unit.
const unitStatuses: Ref<{ [key:string]: String }> = ref({});

watch(combatEventsStore.events, (events) => {
  events.forEach((event) => {
    if(event.acknowledged) return;
    event.acknowledged = true;

    const unitId = event.target.getId();
    if (event.type === 'damage') {
      unitStatuses.value[unitId] = 'damaged';
    } else if (event.type === 'heal') {
      unitStatuses.value[unitId] = 'healed';
    }

    // Remove the status after the animation duration.
    setTimeout(() => {
      if (unitStatuses.value[unitId]) {
        unitStatuses.value[unitId] = '';
      }
    }, 1000); // Duration should match the longest animation duration.
  });
}, { deep: true });


</script>

<template>
  <div class="battlefield" v-if="activeEncounter">
    <div class="enemy-column">
      <UnitCard 
        v-for="(unit, index) in activeEncounter.enemyParty.units" 
        :key="'enemy-' + index" 
        :unit="unit"
        :class="unitStatuses[unit.getId()]"
      />
    </div>
    <div class="player-column">
      <UnitCard 
        v-for="(unit, index) in activeEncounter.playerParty.units" 
        :key="'player-' + index" 
        :unit="unit"
        :class="unitStatuses[unit.getId()]"
      />
    </div>
  </div>
</template>

<style scoped>
.battlefield {
  display: flex;
  justify-content: space-around;
  gap: 20px;
}

.enemy-column, .player-column {
  display: flex;
  flex-direction: column;
  align-items: center;
}

</style>
