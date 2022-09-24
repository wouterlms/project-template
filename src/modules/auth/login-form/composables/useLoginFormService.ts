import { AxiosError } from 'axios'
import type { Form } from '@wouterlms/forms'

import { useAuth, useLocalStorage } from '@/composables'
import { useForgotPasswordStore } from '@/stores'

import type { FormService, LoginFormState } from '@/types'
import { LocalStorageKey } from '@/enums'

const useLoginFormService: FormService<Form<LoginFormState>> = (formState) => {
  const { t } = useI18n()
  const { replace } = useRouter()
  const { user, signIn, getUser } = useAuth()
  const { lastLoginAttemptEmail } = useForgotPasswordStore()
  const lastLoggedInUser = useLocalStorage(LocalStorageKey.LAST_LOGGED_IN_USER)

  const handleSubmit = async (): Promise<void> => {
    const { email, password } = formState.getData()

    try {
      await signIn(email, password)
      await getUser()

      lastLoggedInUser.value = user.value

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
