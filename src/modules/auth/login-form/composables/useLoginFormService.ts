import { AxiosError } from 'axios'
import type { Form } from '@wouterlms/forms'

import { useAuthStore } from '@/stores'

import type { FormService, LoginFormState } from '@/types'

const useLoginFormService: FormService<Form<LoginFormState>> = (formState) => {
  const { t } = useI18n()
  const { replace } = useRouter()
  const { lastLoginAttemptEmail, login } = useAuthStore()

  const handleSubmit = async (): Promise<void> => {
    const { email, password } = formState.getData()

    try {
      await login(email, password)
      await replace('/')
    } catch (e) {
      lastLoginAttemptEmail.value = email

      if (
        e instanceof AxiosError &&
        e.response !== undefined &&
        [
          400,
          401
        ].includes(e.response.status)) {
        formState.setErrors({
          email: t('auth.login.invalid_email_or_password'),
          password: true,
        })
      }
    }
  }

  return {
    handleSubmit,
  }
}

export default useLoginFormService
