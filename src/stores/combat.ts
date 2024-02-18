import type { CombatEvent } from "@/lib/core/actions/combat";
import { defineStore } from "pinia";
import { ref, type Ref } from "vue";

export const useCombatEvents = defineStore('combatEvents', () => {
  const events: Ref<CombatEvent[]> = ref([]);
  const addEvent = (event: CombatEvent) => {
    events.value.push(event);
  };

  const clearEvents = () => {
    events.value = [];
  }

  return {
    addEvent,
    events,
    clearEvents,
  };
});
