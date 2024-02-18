<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="font-sans">
    <!-- Header Section -->
    <header class="bg-blue-800 text-white p-4 flex flex-col sm:flex-row justify-between items-center">
      <div class="flex items-center space-x-2 sm:space-x-4 mb-2 sm:mb-0">
        <!-- <img src="@/assets/logo.png" alt="Logo" class="h-8"> -->
        <h1 class="text-lg sm:text-2xl font-bold">Incremental Regression</h1>
      </div>
      <div class="text-sm sm:text-base space-x-1 sm:space-x-4 mb-2 sm:mb-0">
        <span>Gold: 990</span>
        <span>Diamonds: 390</span>
        <span>Points: 45,500</span>
      </div>
    </header>

    <!-- Main Content -->
    <div class="bg-gray-900 text-white">
      <!-- Tabs -->
      <div class="overflow-x-auto">
        <div class="flex justify-between sm:justify-center my-2 whitespace-nowrap">
          <RouterLink to="/events" class="tab mx-1">Events</RouterLink>
          <RouterLink to="/encounter" class="tab mx-1">Encounter</RouterLink>
          <button class="tab mx-1">Exploration</button>
          <button class="tab mx-1">Social</button>
          <!-- ... more tabs -->
        </div>
      </div>

      <!-- Main Content -->
      <div class="p-2">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'App',
}
</script>

<style scoped>
</style>
