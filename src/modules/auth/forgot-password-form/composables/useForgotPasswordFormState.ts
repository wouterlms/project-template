import { useValidation, useFormState } from '@wouterlms/forms'

import type { Form } from '@wouterlms/forms'

import { useAuthStore } from '@/stores'

import type { ForgotPasswordFormState } from '@/types'

export default (): Form<ForgotPasswordFormState> => {
  const { applyRules } = useValidation()
  const { lastLoginAttemptEmail } = useAuthStore()

  const formState = useFormState<ForgotPasswordFormState>(reactive({
    email: {
      value: lastLoginAttemptEmail.value,
      validate: async (email) => await applyRules(email, {
        required: true,
        email: true,
      }),
    },
  }))

  return formState
}
