import { createRouter, createWebHistory } from 'vue-router'
import Inicio from '../views/Inicio.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'inicio', component: Inicio },
    {
      path: '/reservas',
      name: 'reservas',
      component: () => import('../views/Reservas.vue') // Lazy loading
    },
    { path: '/perfil', name: 'perfil', component: () => import('../views/MiPerfil.vue') }
  ]
})

export default router
