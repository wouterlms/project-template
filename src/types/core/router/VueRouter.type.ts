import type RouteMiddleware from './RouteMiddleware.type'

export { }

declare module 'vue-router' {
  interface RouteMeta {
    middleware?: RouteMiddleware[]
  }
}
