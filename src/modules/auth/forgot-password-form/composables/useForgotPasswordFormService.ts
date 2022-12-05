import type { FormState } from '@wouterlms/forms'

import { authService } from '@/services'
import { useForgotPasswordStore } from '@/stores'
import { transformApiErrors } from '@/utils'

import type { ForgotPasswordFormState } from '@/types'

type UseForgotPasswordFormService = (formState: FormState<ForgotPasswordFormState>) => {
  handleSubmit: () => Promise<void>
}

const useForgotPasswordFormService: UseForgotPasswordFormService = (formState) => {
  const forgotPasswordStore = useForgotPasswordStore()

  const handleSubmit = async (): Promise<void> => {
    const { email } = formState.getData()

    try {
      await authService.forgotPassword({ email })
      forgotPasswordStore.setHasSentEmail(true)
    }
    catch (err) {
      formState.setErrors(transformApiErrors(err))
    }
  }

  return {
    handleSubmit,
  }
}

export default useForgotPasswordFormService
