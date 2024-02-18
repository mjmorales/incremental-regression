<script setup lang="ts">
import { GameEvent } from '@/lib/core/event';
import { DateTime } from 'luxon';
import { computed, watch } from 'vue';

const props = defineProps({
  event: GameEvent,
});

const gameEvent: GameEvent = props.event!;
const c = computed(() => {
  const now = DateTime.now();
  const eventWillFire = now.plus({ seconds: gameEvent.secondsToComplete });
  const timeparts = eventWillFire.diff(now, ['days', 'hours', 'minutes', 'seconds']).toObject();
  return {
    eventWillFire,
    timeparts,
  };
});
</script>

<template>
  {{ c.timeparts }}
  <div class="grid grid-flow-col gap-5 text-center auto-cols-max">
  <div class="flex flex-col">
    <span class="countdown font-mono text-5xl">
      <span v-bind:style="`--value:${c.timeparts.days}`"></span>
    </span>
    {{ c.timeparts.days }}days
  </div> 
  <div class="flex flex-col">
    <span class="countdown font-mono text-5xl">
      <span v-bind:style="`--value:${c.timeparts.hours}`"></span>
    </span>
    hours
  </div> 
  <div class="flex flex-col">
    <span class="countdown font-mono text-5xl">
      <span v-bind:style="`--value:${c.timeparts.minutes}`"></span>
    </span>
    min
  </div> 
  <div class="flex flex-col">
    <span class="countdown font-mono text-5xl">
      <span v-bind:style="`--value:${c.timeparts.seconds}`"></span>
    </span>
    sec
  </div>
</div>
</template>