<script setup lang="ts">
import type { GameEvent } from '@/lib/core/event';
import { useGameEvents } from '@/stores/game';
import GameEventCountdown from '@/components/events/GameEventCountdown.vue';
import { computed, watch } from 'vue';

const store = useGameEvents();
const c = computed(() => {
  console.log('GameEvents.vue: computed gameEvents', store.gameEvents);
  return {
    gameEvents: store.gameEvents,
  };
});

</script>

<template>
  <div class="game-events">
    <div class="event" v-for="(event, index) in c.gameEvents" :key="index">
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <h2 class="card-title">{{ event.name }}</h2>
          <p>{{ event.description }}</p>
          <GameEventCountdown :event="event" />
          <div class="divider"></div>
          <ul>
            <li v-for="(evaluator, index) in event.evaluators" :key="index">
              <span>{{ evaluator.description }} - {{ evaluator.requirement }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>