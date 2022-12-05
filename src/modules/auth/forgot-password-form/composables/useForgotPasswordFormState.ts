import { useFormState } from '@wouterlms/forms'
import { applyRules } from '@wouterlms/validation'
import type { FormState } from '@wouterlms/forms'

import { useForgotPasswordStore } from '@/stores'

import type { ForgotPasswordFormState } from '@/types'

export default (): FormState<ForgotPasswordFormState> => {
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
