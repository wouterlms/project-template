import type LastLoggedInUser from './LastLoggedInUser'
import type { LocalStorageKey } from '@/enums'

export default interface LocalStorageValue {
  [LocalStorageKey.LAST_LOGGED_IN_USER]: LastLoggedInUser
}
