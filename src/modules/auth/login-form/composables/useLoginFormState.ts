import { useFormState } from '@wouterlms/forms'
import { applyRules } from '@wouterlms/validation'
import type { FormState } from '@wouterlms/forms'

import { useLocalStorage } from '@/composables'

import type { LoginFormState } from '@/types'
import { LocalStorageKey } from '@/enums'

export default (): FormState<LoginFormState> => {
  const lastLoggedInUser = useLocalStorage(LocalStorageKey.LAST_LOGGED_IN_USER)

  const formState = useFormState<LoginFormState>(reactive({
    email: {
      value: lastLoggedInUser.value?.email ?? null,
      validate: async (email) => await applyRules(email, {
        required: true,
        email: true,
      }),
    },
    password: {
      value: null,
      validate: async (password) => await applyRules(password, {
        required: true,
      }),
    },
  }))

  return formState
}
