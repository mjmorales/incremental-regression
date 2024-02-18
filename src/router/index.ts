import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/encounter',
      name: 'Encounter',
      component: () => import('@/views/Encounter.vue')
    },
    {
      path: '/events',
      name: 'Events',
      component: () => import('@/views/GameEvents.vue')
    }
  ]
})

export default router
