import type { Form } from '@wouterlms/forms'
import type { LoginFormState } from '@/types'

const { VITE_TEST_ACCOUNTS } = import.meta.env

export default (formState: Form<LoginFormState>): void => {
  const testAccounts: string[] = JSON.parse(VITE_TEST_ACCOUNTS ?? '[]')

  if (import.meta.env.DEV) {
    watch(() => formState.formObject.email.value, (value) => {
      testAccounts.forEach(([
        key,
        email,
        password
      ]) => {
        if (value === key) {
          void formState.setData({
            email,
            password,
          })
        }
      })
    })
  }
}
