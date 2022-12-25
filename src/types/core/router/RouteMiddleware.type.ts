import type { RouteLocationRaw } from 'vue-router'

type RouteMiddleware = () => Promise<RouteLocationRaw | string | undefined>

export default RouteMiddleware
