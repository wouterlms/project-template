import { createRouter, createWebHistory } from 'vue-router'

import authRoutes from '@/modules/auth/router'

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
      children: [/* TODO: add routes */],
    },
    ...authRoutes,
    {
      path: '/:catchAll(.*)',
      redirect: '/',
    },
  ],
})

router.beforeEach(async (to) => {
  const { matched } = to

  const middlewares = matched
    .filter(({ meta }) => meta.middleware != null)
    .map(({ meta }) => meta.middleware!)
    .flat()

  if (middlewares !== null) {
    for (const middleware of middlewares) {
      const result = await middleware()

      if (result !== undefined)
        return result
    }
  }
})

export default router
