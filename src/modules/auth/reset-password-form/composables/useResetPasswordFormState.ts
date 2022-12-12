import { useFormState } from '@wouterlms/forms'
import { applyRules } from '@wouterlms/validation'
import type { FormState } from '@wouterlms/forms'

import { useRouteParams } from '@/composables'
import type { ResetPasswordFormState } from '@/types'

export default (): FormState<ResetPasswordFormState> => {
  const { token } = useRouteParams()
  const route = useRoute()

  const { email } = route.query

  const formState = useFormState<ResetPasswordFormState>(reactive({
    token: {
      value: token,
    },
    email: {
      value: email as string ?? null,
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
