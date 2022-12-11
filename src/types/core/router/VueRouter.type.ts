export {}

declare module 'vue-router' {
  interface RouteMeta {
    middleware?: RouteGuard[]
  }
}
