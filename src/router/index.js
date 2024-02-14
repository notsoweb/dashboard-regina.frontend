import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../pages/HomeView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'auth.login',
      component: () => import('../pages/Auth/Login.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../pages/AboutView.vue')
    }
  ]
})

export default router
