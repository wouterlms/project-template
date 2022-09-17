import type {
  NavigationGuardNext,
  RouteLocationNormalized
} from 'vue-router'

import {
  useAuthStore,
  useProfileStore
} from '@/stores'

import { Route } from '@/routes'

export const assertIsLoggedIn = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
): Promise<void> => {
  const {
    hasFetchedProfile,
    getProfile,
  } = useAuthStore()

  const { profile } = useProfileStore()

  try {
    if (hasFetchedProfile.value && profile.value !== null) next()
    else {
      await getProfile()

      next()
    }
  } catch (e) {
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
  const {
    hasFetchedProfile,
    getProfile,
  } = useAuthStore()

  const { profile } = useProfileStore()

  try {
    if ((hasFetchedProfile.value && profile.value === null)) next()
    else {
      await getProfile()
      next('/')
    }
  } catch (e) {
    next()
  }
}
