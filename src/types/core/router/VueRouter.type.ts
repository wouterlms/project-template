import type { RouteGuard } from './RouteGuard.type'

export { }

declare module 'vue-router' {
  interface RouteMeta {
    middleware?: RouteGuard[]
  }
}
