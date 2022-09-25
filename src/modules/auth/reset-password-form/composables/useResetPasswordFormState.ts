import { useFormState, useValidation } from '@wouterlms/forms'

import type { Form } from '@wouterlms/forms'
import type { ResetPasswordFormState } from '@/types'

export default (): Form<ResetPasswordFormState> => {
  const { applyRules } = useValidation()
  const { params, query } = useRoute()

  const formState = useFormState<ResetPasswordFormState>(reactive({
    token: {
      value: params.token as string,
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
