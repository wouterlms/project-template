import type { FormState } from '@wouterlms/forms2'
import { useFormState, useValidation } from '@wouterlms/forms2'

import type { ResetPasswordFormState } from '@/types'
import { useRouteParams } from '@/composables'

export default (): FormState<ResetPasswordFormState> => {
  const { applyRules } = useValidation()
  const { query } = useRoute()
  const { token } = useRouteParams()

  const formState = useFormState<ResetPasswordFormState>(reactive({
    token: {
      value: token,
    },
    email: {
      value: query.email as string,
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
