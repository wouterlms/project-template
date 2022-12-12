import { useAuth } from '@/composables'

import { Route } from '@/enums'
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
