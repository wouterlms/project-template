import { createRouter, createWebHistory } from 'vue-router'

import authRoutes from '@/modules/auth/router'
import testRoutes from '@/modules/test/router'

import { auth } from '@/middleware'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '',
      component: async () => await import('@/components/layout/AppLayout.vue'),
      meta: {
        middleware: [auth],
      },
      children: [...testRoutes],
    },
    ...authRoutes,
    {
      path: '/:catchAll(.*)',
      redirect: '/',
    },
  ],
})

router.beforeEach(async (to) => {
  const { meta } = to

  const middlewares = meta.middleware ?? null

  if (middlewares !== null) {
    for (const middleware of middlewares) {
      const result = await middleware()

      if (result !== undefined)
        return result
    }
  }
})

export default router
