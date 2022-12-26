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

  const routes = router.getRoutes()
  const routesWithStores = routes.filter(({ meta }) => meta.store != null)

  if (middlewares !== null) {
    for (const middleware of middlewares) {
      const result = await middleware()

      if (result !== undefined)
        return result
    }
  }

  for (const routeWithStore of routesWithStores) {
    const { path } = to
    const { meta, path: routeWithStorePath } = routeWithStore

    if (!path.startsWith(routeWithStorePath)) {
      const { store } = meta
      const { $id, reset } = store!()

      try {
        reset()
      }
      catch {
        throw new Error(`Attempted to call \`reset()\` on ${$id}Store`)
      }
    }
  }
})

export default router
