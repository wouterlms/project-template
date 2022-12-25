import { AxiosError } from 'axios'
import type { FormState } from '@wouterlms/forms'

import { useAuth } from '@/composables'
import { useForgotPasswordStore, useLoginStore } from '@/stores'

import type { LoginFormState } from '@/types'

type UseLoginFormService = (formState: FormState<LoginFormState>) => {
  handleSubmit: () => Promise<void>
}

const useLoginFormService: UseLoginFormService = (formState) => {
  const { t } = useI18n()
  const auth = useAuth()
  const router = useRouter()

  const forgotPasswordStore = useForgotPasswordStore()
  const loginStore = useLoginStore()

  const handleSubmit = async (): Promise<void> => {
    const { email, password } = formState.getData()

    try {
      await auth.signIn(email, password)
      const user = await auth.getUser()

      forgotPasswordStore.setLastLoginAttemptEmail(null)
      loginStore.setLastLoggedInUser(user)

      await router.replace('/')
    }
    catch (err) {
      forgotPasswordStore.setLastLoginAttemptEmail(email)

      if (err instanceof AxiosError) {
        const { response } = err

        if (response !== undefined && [400, 401].includes(response.status)) {
          formState.setErrors({
            password: t('auth.login_form.invalid_email_or_password'),
          })
        }
        else {
          throw err
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
