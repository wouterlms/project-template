import { useFormState } from '@wouterlms/forms'
import { applyRules } from '@wouterlms/validation'
import type { FormState } from '@wouterlms/forms'

import { useLoginStore } from '@/stores'

import type { LoginFormState } from '@/types'

export default (): FormState<LoginFormState> => {
  const loginStore = useLoginStore()

  const { lastLoggedInUser } = loginStore

  const formState = useFormState<LoginFormState>(reactive({
    email: {
      value: lastLoggedInUser?.email ?? null,
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
