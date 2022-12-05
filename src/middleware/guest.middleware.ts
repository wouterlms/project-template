import { useAuth } from '@/composables'

import type { RouteGuard } from '@/types'

const guest: RouteGuard = async () => {
  const { getUser, isAuthenticated } = useAuth()

  try {
    if (isAuthenticated.value)
      return '/'

    await getUser()

    return '/'
  }
  catch {}
}

export default guest
