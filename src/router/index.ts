import MainPage from '@/pages/MainPage.vue'
import PokemonData from '@/pages/PokemonData.vue'
import { createRouter, createWebHistory } from 'vue-router'
export const routes = [
  { path: "/", component: MainPage },
  { path: "/pokemon/:id", component: PokemonData, name: 'PokeData' }
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
})

export default router
