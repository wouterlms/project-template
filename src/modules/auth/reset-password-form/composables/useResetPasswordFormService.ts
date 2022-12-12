import type { FormState } from '@wouterlms/forms'

import { transformApiErrors } from '@/utils'
import { useAuth } from '@/composables'
import { authService } from '@/services'
import { useLoginStore } from '@/stores'

import type { ResetPasswordFormState } from '@/types'

type UseResetPasswordFormService = (formState: FormState<ResetPasswordFormState>) => {
  handleSubmit: () => Promise<void>
}

const useResetPasswordFormService: UseResetPasswordFormService = (formState) => {
  const auth = useAuth()
  const router = useExtendedRouter()

  const loginStore = useLoginStore()

  const signInWithNewCredentials = async (): Promise<void> => {
    const { email, password } = formState.getData()

    await auth.signIn(email, password)
    const user = await auth.getUser()

    loginStore.setLastLoggedInUser(user)

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
