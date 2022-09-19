import type { Ref } from 'vue'

interface UseForgotPasswordFormStore {
  lastLoginAttemptEmail: Ref<Nullable<string>>
  hasSentEmail: Ref<boolean>
}

const lastLoginAttemptEmail = ref<Nullable<string>>(null)
const hasSentEmail = ref(false)

export default (): UseForgotPasswordFormStore => ({
  lastLoginAttemptEmail,
  hasSentEmail,
})
