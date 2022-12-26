import type { StoreDefinition } from 'pinia'

import type RouteMiddleware from './RouteMiddleware.type'

export { }

declare module 'vue-router' {
  interface RouteMeta {
    /**
     * Route middleware
     */
    middleware?: RouteMiddleware[]

    /**
     * Pinia store, will be reset if this route does not match the current route
     */
    store?: StoreDefinition
  }
}
