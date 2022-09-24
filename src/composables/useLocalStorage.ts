import type { Ref } from 'vue'

import { useLocalStorage } from '@wouterlms/composables'

import type { LocalStorageKey } from '@/enums'
import type { LocalStorageValue } from '@/types'

export default <T extends LocalStorageKey>(key: T): Ref<Nullable<LocalStorageValue[T]>> => {
  const localStorageValue = useLocalStorage(key) as Ref<LocalStorageValue[T]>

  return localStorageValue
}
