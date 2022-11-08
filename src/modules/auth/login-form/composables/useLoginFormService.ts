import { AxiosError } from 'axios'
import type { FormState } from '@wouterlms/forms2'

import { useAuth, useLocalStorage } from '@/composables'
import { useForgotPasswordStore } from '@/stores'
import { handleApiError } from '@/utils'

import type { FormService, LoginFormState } from '@/types'
import { LocalStorageKey } from '@/enums'

const useLoginFormService: FormService<FormState<LoginFormState>> = (formState) => {
  const { t } = useI18n()
  const auth = useAuth()
  const router = useRouter()
  const forgotPasswordStore = useForgotPasswordStore()
  const lastLoggedInUser = useLocalStorage(LocalStorageKey.LAST_LOGGED_IN_USER)

  const handleSubmit = async (): Promise<void> => {
    const { email, password } = formState.getData()

    try {
      await auth.signIn(email, password)
      await auth.getUser()

      lastLoggedInUser.value = auth.user.value

      await router.replace('/')
    }
    catch (err) {
      forgotPasswordStore.setLastLoginAttemptEmail(email)

      if (err instanceof AxiosError) {
        const { response } = err

        if (response !== undefined && [400, 401].includes(response.status)) {
          formState.setErrors({
            email: t('auth.login_form.invalid_email_or_password'),
            password: true,
          })
        }
        else {
          handleApiError(err)
        }
      }
      else { throw err }
    }
  }

  return {
    handleSubmit,
  }
}

export default useLoginFormService
