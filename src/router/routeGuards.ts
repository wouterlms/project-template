import type {
  NavigationGuardNext,
  RouteLocationNormalized
} from 'vue-router'

import { useAuth } from '@/composables'
import { Route } from '@/routes'

export const assertIsLoggedIn = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
): Promise<void> => {
  const { getUser } = useAuth()

  try {
    await getUser()
    next()
  } catch (_) {
    next({
      name: Route.LOGIN,
    })
  }
}

export const assertIsLoggedOut = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
): Promise<void> => {
  const { getUser } = useAuth()

  try {
    await getUser()
    next('/')
  } catch (_) {
    next()
  }
}
