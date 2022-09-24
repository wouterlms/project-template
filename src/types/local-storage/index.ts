import type LastLoggedInUser from './LastLoggedInUser'

import type { LocalStorageKey } from '@/enums'

export interface LocalStorageValue {
  [LocalStorageKey.LAST_LOGGED_IN_USER]: LastLoggedInUser
}
