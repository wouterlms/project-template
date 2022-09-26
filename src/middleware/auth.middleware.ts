import type { RouteLocationRaw } from 'vue-router'
import { useAuth } from '@/composables'
import { Route } from '@/routes'

export default async (): Promise<RouteLocationRaw | undefined> => {
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
