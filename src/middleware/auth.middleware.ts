import { useAuth } from '@/composables'

import { Route } from '@/routes'
import type { RouteGuard } from '@/types'

const auth: RouteGuard = async () => {
  const { getUser, isAuthenticated } = useAuth()

  try {
    if (!isAuthenticated.value)
      await getUser()
  }
  catch {
    return {
      name: Route.LOGIN,
    }
  }
}

export default auth
