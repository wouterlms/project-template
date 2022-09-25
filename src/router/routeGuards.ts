import type { RouteLocationRaw } from 'vue-router'

import { useAuth } from '@/composables'
import { Route } from '@/routes'

export const assertIsLoggedIn = async (): Promise<RouteLocationRaw | undefined> => {
  const { getUser } = useAuth()

  try {
    await getUser()
  }
  catch (_) {
    return {
      name: Route.LOGIN,
    }
  }
}

export const assertIsLoggedOut = async (): Promise<string | undefined> => {
  const { getUser } = useAuth()

  try {
    await getUser()
    return '/'
  }
  catch (_) {
  }
}
