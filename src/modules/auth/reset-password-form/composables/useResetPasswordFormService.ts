import type { FormState } from '@wouterlms/forms'

import { transformApiErrors } from '@/utils'
import { useAuth, useLocalStorage } from '@/composables'
import { authService } from '@/services'

import type { ResetPasswordFormState } from '@/types'
import { LocalStorageKey } from '@/enums'

type UseResetPasswordFormService = (formState: FormState<ResetPasswordFormState>) => {
  handleSubmit: () => Promise<void>
}

const useResetPasswordFormService: UseResetPasswordFormService = (formState) => {
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
      formState.setErrors(transformApiErrors(err))
    }
  }

  return {
    handleSubmit,
  }
}

export default useResetPasswordFormService
