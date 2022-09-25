import type { AxiosError } from 'axios'
import type { Form } from '@wouterlms/forms'
import { useAxiosErrorTransformer } from '@wouterlms/composables'

import { forgotPassword } from '@/services'
import { useForgotPasswordStore } from '@/stores'

import type { ForgotPasswordFormState, FormService } from '@/types'

const useForgotPasswordFormService: FormService<Form<ForgotPasswordFormState>> = (formState) => {
  const { hasSentEmail } = useForgotPasswordStore()

  const handleSubmit = async (): Promise<void> => {
    const { email } = formState.getData()

    try {
      await forgotPassword(email)
      hasSentEmail.value = true
    }
    catch (e) {
      formState.setErrors(useAxiosErrorTransformer()(e as AxiosError))
    }
  }

  return {
    handleSubmit,
  }
}

export default useForgotPasswordFormService
