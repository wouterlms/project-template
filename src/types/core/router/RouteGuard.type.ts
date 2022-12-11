import type { RouteLocationRaw } from 'vue-router'

export type RouteGuard = () => Promise<RouteLocationRaw | string | undefined>
