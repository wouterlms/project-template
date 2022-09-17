import { useValidation, useFormState } from '@wouterlms/forms'

import type { Form } from '@wouterlms/forms'
import type { LoginFormState } from '@/types'

export default (): Form<LoginFormState> => {
  const { applyRules } = useValidation()

  const formState = useFormState<LoginFormState>(reactive({
    email: {
      value: null,
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
