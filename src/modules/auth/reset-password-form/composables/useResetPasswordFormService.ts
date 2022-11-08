import type { FormState } from '@wouterlms/forms2'

import { handleApiError } from '@/utils'
import { useAuth, useLocalStorage } from '@/composables'
import { authService } from '@/services'

import type { FormService, ResetPasswordFormState } from '@/types'
import { LocalStorageKey } from '@/enums'

const useResetPasswordFormService: FormService<FormState<ResetPasswordFormState>> = (formState) => {
  const auth = useAuth()
  const router = useRouter()
  const lastLoggedInUser = useLocalStorage(LocalStorageKey.LAST_LOGGED_IN_USER)

  const signInWithNewCredentials = async (): Promise<void> => {
    const { email, password } = formState.getData()

    await auth.signIn(email, password)
    await auth.getUser()

    lastLoggedInUser.value = auth.user.value

    await router.replace('/')
  }

  const handleSubmit = async (): Promise<void> => {
    const data = formState.getData()

    try {
      await authService.resetPassword(data)
      await signInWithNewCredentials()
    }
    catch (err) {
      handleApiError(err)
    }
  }

  return {
    handleSubmit,
  }
}

export default useResetPasswordFormService
