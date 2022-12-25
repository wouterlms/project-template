import { useAuth } from '@/composables'

import type { RouteMiddleware } from '@/types'

const guest: RouteMiddleware = async () => {
  const { getUser, isAuthenticated } = useAuth()

  try {
    if (isAuthenticated.value)
      return '/'

    await getUser()

    return '/'
  }
  catch { }
}

export default guest
