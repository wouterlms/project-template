import type { Ref } from 'vue'

interface UseResetPasswordFormStore {
  hasResetPassword: Ref<boolean>
}

const hasResetPassword = ref(false)

export default (): UseResetPasswordFormStore => ({
  hasResetPassword,
})
