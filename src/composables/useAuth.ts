import { useAuth } from '@appwise/vue-oauth2'
import type { UseAuth } from '@appwise/vue-oauth2'

import router from '@/router'

import { useAuthStore } from '@/stores'

import { Route } from '@/enums'
import type { Profile } from '@/types'

const {
  VITE_API_BASE_URL,
  VITE_CLIENT_ID,
  VITE_CLIENT_SECRET,
} = import.meta.env

if (
  VITE_API_BASE_URL == null
  || VITE_CLIENT_ID == null
  || VITE_CLIENT_SECRET == null
)
  throw new Error('API Base URL, Client ID, or Client Secret is not defined. Make sure to define `VITE_API_BASE_URL`, `VITE_CLIENT_ID`, and `VITE_CLIENT_SECRET` in your .env file.')

export default (): Omit<UseAuth<Profile>, 'user'> => {
  const authStore = useAuthStore()

  const auth = useAuth<Profile>({
    baseURL: VITE_API_BASE_URL,
    clientId: VITE_CLIENT_ID,
    clientSecret: VITE_CLIENT_SECRET,
    autoRefreshAccessToken: true,
    endpoints: {
      userInfo: '/api/users/me',
      revoke: '',
    },
    onRefreshTokenFailed: () => {
      void router.push({ name: Route.LOGIN })
    },
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
