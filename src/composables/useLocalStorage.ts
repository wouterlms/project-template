import type { Ref } from 'vue'

import { useLocalStorage } from '@wouterlms/composables'

import type { LocalStorageKey } from '@/enums'
import type { LocalStorageValue } from '@/types'

export default <T extends LocalStorageKey>(
  key: T, defaultValue?: Nullable<T>,
): Ref<Nullable<LocalStorageValue[T]>> => (
  useLocalStorage(key, defaultValue) as Ref<LocalStorageValue[T]>
)
