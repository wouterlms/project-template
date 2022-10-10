import { useAuth } from '@/composables'
import type { RouteGuard } from '@/types'
import { Route } from '@/routes'

const auth: RouteGuard = async () => {
  const { getUser } = useAuth()

  try {
    await getUser()
  }
  catch {
    return {
      name: Route.LOGIN,
    }
  }
}

export default auth
