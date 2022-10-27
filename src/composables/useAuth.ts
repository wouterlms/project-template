import { useAuth } from '@appwise/vue-oauth2'
import type { UseAuth } from '@appwise/vue-oauth2'
import type { Profile } from '@/types'

const {
  VITE_API_BASE_URL,
  VITE_CLIENT_ID,
  VITE_CLIENT_SECRET,
} = import.meta.env

export default (): UseAuth<Profile> => useAuth<Profile>({
  baseURL: VITE_API_BASE_URL,
  clientId: VITE_CLIENT_ID,
  clientSecret: VITE_CLIENT_SECRET,
  snakeCase: true,
})
