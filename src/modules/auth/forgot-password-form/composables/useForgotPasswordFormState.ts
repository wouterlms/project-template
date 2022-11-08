import { useFormState, useValidation } from '@wouterlms/forms2'
import type { FormState } from '@wouterlms/forms2'

import { useForgotPasswordStore } from '@/stores'

import type { ForgotPasswordFormState } from '@/types'

export default (): FormState<ForgotPasswordFormState> => {
  const { applyRules } = useValidation()
  const forgotPasswordStore = useForgotPasswordStore()

  const formState = useFormState<ForgotPasswordFormState>(reactive({
    email: {
      value: forgotPasswordStore.lastLoginAttemptEmail,
      validate: async (email) => await applyRules(email, {
        required: true,
        email: true,
      }),
    },
  }))

  return formState
}
