import { useFormState, useValidation } from '@wouterlms/forms2'
import type { FormState } from '@wouterlms/forms2'

import { useRouteParams } from '@/composables'
import type { ResetPasswordFormState } from '@/types'

export default (): FormState<ResetPasswordFormState> => {
  const { applyRules } = useValidation()
  const { token } = useRouteParams()
  const route = useRoute()

  const { email } = route.query

  const formState = useFormState<ResetPasswordFormState>(reactive({
    token: {
      value: token,
    },
    email: {
      value: email as string,
      validate: async (email) => await applyRules(email, {
        required: true,
        email: true,
      }),
    },
    password: {
      value: null,
      validate: async (password) => await applyRules(password, {
        required: true,
        minLength: 8,
      }),
    },
  }))

  return formState
}
