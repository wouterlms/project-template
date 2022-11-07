import { useFormState, useValidation } from '@wouterlms/forms'

import type { Form } from '@wouterlms/forms'

import { useForgotPasswordStore } from '@/stores'

import type { ForgotPasswordFormState } from '@/types'

export default (): Form<ForgotPasswordFormState> => {
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
