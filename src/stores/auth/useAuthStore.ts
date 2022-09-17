import axios from 'axios'

import type { Ref } from 'vue'
import type { AxiosResponse } from 'axios'

import useProfileStore from './useProfileStore'

import { getProfile, login } from '@/services'

import type { OAuth, Profile } from '@/types'

interface UseAuthStore {
  oAuth: Ref<Nullable<OAuth>>
  hasFetchedProfile: Ref<boolean>
  lastLoginAttemptEmail: Ref<Nullable<string>>
  getProfile: () => Promise<AxiosResponse<Profile>>
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

const oAuth: UseAuthStore['oAuth'] = ref(localStorage.getItem('oAuth') !== undefined
  ? JSON.parse(localStorage.getItem('oAuth') as string)
  : null
)

watch((oAuth), (oAuth) => {
  if (oAuth !== null) axios.defaults.headers.common.Authorization = `Bearer ${oAuth.accessToken}`

  localStorage.setItem('oAuth', JSON.stringify(oAuth))
}, { immediate: true })

const hasFetchedProfile: UseAuthStore['hasFetchedProfile'] = ref(false)
const lastLoginAttemptEmail: UseAuthStore['lastLoginAttemptEmail'] = ref(null)

export default (): UseAuthStore => {
  const { setProfile } = useProfileStore()

  const _getProfile: UseAuthStore['getProfile'] = async () => await new Promise((resolve, reject) => {
    if (oAuth.value === null) {
      reject(new Error('oAuth is null'))
      return
    }

    const profileRequest = getProfile()

    void profileRequest
      .then(({ data }) => {
        setProfile(data)
      })
      .finally(() => {
        hasFetchedProfile.value = true
      })
  })

  const _login: UseAuthStore['login'] = async (email, password) => {
    const { data } = await login(email, password)

    oAuth.value = data

    await nextTick()
    await getProfile()
  }

  const logout: UseAuthStore['logout'] = () => {
    oAuth.value = null
    setProfile(null)
  }

  return {
    oAuth,
    hasFetchedProfile,
    lastLoginAttemptEmail,
    getProfile: _getProfile,
    login: _login,
    logout,
  }
}
