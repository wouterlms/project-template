import type { AxiosError } from 'axios'

import type { Form } from '@wouterlms/forms'
import { useAxiosErrorTransformer } from '@wouterlms/composables'

import { resetPassword } from '@/services'
import { useResetPasswordStore } from '@/stores'

import type { FormService, ResetPasswordFormState } from '@/types'

const useResetPasswordFormService: FormService<Form<ResetPasswordFormState>> = (formState) => {
  const { hasResetPassword } = useResetPasswordStore()

  const handleSubmit = async (): Promise<void> => {
    const data = formState.getData()

    try {
      await resetPassword(data)

      hasResetPassword.value = true
    } catch (e) {
      formState.setErrors(useAxiosErrorTransformer()(e as AxiosError))
    }
  }

  return {
    handleSubmit,
  }
}

export default useResetPasswordFormService
