import type { Ref } from 'vue'
import type { Profile } from '@/types'

interface UseProfileStore {
  profile: Ref<Nullable<Profile>>
  setProfile: (newProfile: Nullable<Profile>) => void
}

const profile: UseProfileStore['profile'] = ref(null)

export default (): UseProfileStore => {
  const setProfile = (newProfile: Nullable<Profile>): void => {
    profile.value = newProfile

    if (newProfile !== null) localStorage.setItem('lastLoggedInUser', JSON.stringify(newProfile))
  }

  return {
    profile,
    setProfile,
  }
}
