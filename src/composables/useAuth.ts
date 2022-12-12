import { useAuth } from '@appwise/vue-oauth2'
import type { UseAuth } from '@appwise/vue-oauth2'
import { useAuthStore } from '@/stores'
import type { Profile } from '@/types'

const {
  VITE_API_BASE_URL,
  VITE_CLIENT_ID,
  VITE_CLIENT_SECRET,
} = import.meta.env

if (
  VITE_API_BASE_URL === undefined
  || VITE_CLIENT_ID === undefined
  || VITE_CLIENT_SECRET === undefined
)
  throw new Error('API Base URL, Client ID, or Client Secret is not defined. Make sure to define `VITE_API_BASE_URL`, `VITE_CLIENT_ID`, and `VITE_CLIENT_SECRET` in your .env file.')

export default (): Omit<UseAuth<Profile>, 'user'> => {
  const authStore = useAuthStore()

  const auth = useAuth<Profile>({
    baseURL: VITE_API_BASE_URL,
    clientId: VITE_CLIENT_ID,
    clientSecret: VITE_CLIENT_SECRET,
    snakeCase: true,
  })

  const getUser = async (): Promise<Profile> => {
    const user = await auth.getUser()

    authStore.setUser(user)

    return user
  }

  const signOut = (): void => {
    auth.signOut()
    authStore.setUser(null)
  }

  return {
    ...auth,
    getUser,
    signOut,
  }
}
