import { createRouter, createWebHistory } from 'vue-router'
import EncounterVue from '@/views/Encounter.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/encounter',
      name: 'Encounter',
      component: EncounterVue
    }
  ]
})

export default router
