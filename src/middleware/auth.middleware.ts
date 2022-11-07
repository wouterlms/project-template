import { useAuth } from '@/composables'
import type { RouteGuard } from '@/types'
import { Route } from '@/routes'

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
