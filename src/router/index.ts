import { createRouter, createWebHistory } from 'vue-router'
import { assertIsLoggedIn } from './routeGuards'

import authRoutes from '@/modules/auth/router'

import AppLayout from '@/components/layout/AppLayout.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '',
      component: AppLayout,
      beforeEnter: assertIsLoggedIn,
      children: [],
    },
    ...authRoutes,
    {
      path: '/:catchAll(.*)',
      redirect: '/',
    }
  ],
})

export default router
