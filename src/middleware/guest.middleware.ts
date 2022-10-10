import { useAuth } from '@/composables'
import type { RouteGuard } from '@/types'

const guest: RouteGuard = async () => {
  const { getUser } = useAuth()

  try {
    await getUser()
    return '/'
  }
  catch {}
}

export default guest
