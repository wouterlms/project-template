import type { Ref } from 'vue'

interface UseForgotPasswordFormStore {
  hasSentEmail: Ref<boolean>
}

const hasSentEmail = ref(false)

export default (): UseForgotPasswordFormStore => ({
  hasSentEmail,
})
