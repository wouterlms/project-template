import type { AxiosError } from 'axios'
import type { Form } from '@wouterlms/forms'
import { useAxiosErrorTransformer } from '@wouterlms/composables'

import { authService } from '@/services'
import { useForgotPasswordStore } from '@/stores'

import type { ForgotPasswordFormState, FormService } from '@/types'

const useForgotPasswordFormService: FormService<Form<ForgotPasswordFormState>> = (formState) => {
  const { hasSentEmail } = useForgotPasswordStore()

  const handleSubmit = async (): Promise<void> => {
    const { email } = formState.getData()

    try {
      await authService.forgotPassword({ email })
      hasSentEmail.value = true
    }
    catch (err) {
      formState.setErrors(useAxiosErrorTransformer()(err as AxiosError))
    }
  }

  return {
    handleSubmit,
  }
}

export default useForgotPasswordFormService
