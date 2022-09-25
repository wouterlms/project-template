import { useFormState, useValidation } from '@wouterlms/forms'
import type { Form } from '@wouterlms/forms'

import { useLocalStorage } from '@/composables'

import type { LoginFormState } from '@/types'
import { LocalStorageKey } from '@/enums'

export default (): Form<LoginFormState> => {
  const { applyRules } = useValidation()

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
