<template>
  <div class="card bg-gray-800 text-white">
    <div class="card-body p-4">
      <div class="flex items-center space-x-4">
        <!-- Placeholder for unit image -->
        <div class="w-24 h-24 bg-gray-500 flex items-center justify-center text-gray-400">
          <!-- Image here -->
        </div>
        <div class="flex-grow">
          <h2 class="card-title text-xl mb-2">{{ unit.name }}</h2>
          <div class="grid grid-cols-2 gap-2 mb-2">
            <p>Health: {{ unit.health }}</p>
            <p>Threat: {{ unit.threat }}</p>
          </div>
          <div class="flex gap-2 mb-2">
            <span class="badge badge-error badge-outline">STR: {{ unit.strength }}</span>
            <span class="badge badge-info badge-outline">INT: {{ unit.intelligence }}</span>
            <span class="badge badge-warning badge-outline">SPD: {{ unit.speed }}</span>
          </div>
        </div>
      </div>

      <!-- Action Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        <div v-for="(action, index) in unit.actions" :key="index" class="card bg-gray-700 card-bordered p-2">
          <div class="card-body">
            <h3 class="card-title text-lg">{{ action.base.name }}</h3>
            <p class="mb-2">{{ action.base.description }}</p>
            <progress class="progress progress-primary w-full" :value="progressPercentage(action.progress)" max="100"></progress>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { Unit } from '@/lib/core/unit';
import { progressPercentage } from '@/lib/helpers/action';

const props = defineProps({
  unit: Unit,
});

const unit: Unit = props.unit!;
</script>

<style scoped>
.card {
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.card-title {
  color: #fff;
}

.badge {
  border: 1px solid transparent;
}

.progress {
  background-color: #555;
  border-radius: 0.25rem;
}

.progress::after {
  content: '';
  display: block;
  background-color: #10b981;
  width: var(--value);
  height: 100%;
  border-radius: 0.25rem;
}

@keyframes shake {
  0% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  50% { transform: translateX(5px); }
  75% { transform: translateX(-5px); }
  100% { transform: translateX(0); }
}

@keyframes glow {
  0%, 100% { box-shadow: 0 0 5px yellow; }
  50% { box-shadow: 0 0 20px yellow; }
}

.damaged {
  animation: shake 0.5s ease-in-out;
  border: 1px solid red;
}

.healed {
  animation: glow 1s ease-out;
}
</style>