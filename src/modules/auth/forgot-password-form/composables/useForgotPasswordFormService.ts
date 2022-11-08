import type { FormState } from '@wouterlms/forms2'

import { authService } from '@/services'
import { useForgotPasswordStore } from '@/stores'
import { handleApiError } from '@/utils'

import type { ForgotPasswordFormState, FormService } from '@/types'

const useForgotPasswordFormService: FormService<FormState<ForgotPasswordFormState>> = (
  formState,
) => {
  const forgotPasswordStore = useForgotPasswordStore()

  const handleSubmit = async (): Promise<void> => {
    const { email } = formState.getData()

    try {
      await authService.forgotPassword({ email })
      forgotPasswordStore.setHasSentEmail(true)
    }
    catch (err) {
      handleApiError(err)
    }
  }

  return {
    handleSubmit,
  }
}

export default useForgotPasswordFormService
