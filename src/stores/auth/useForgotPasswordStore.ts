import { defineStore } from 'pinia'

export default defineStore('forgotPassword', () => {
  const lastLoginAttemptEmail = ref<Nullable<string>>(null)
  const hasSentEmail = ref(false)

  const setLastLoginAttemptEmail = (email: string): void => {
    lastLoginAttemptEmail.value = email
  }

  const setHasSentEmail = (value: boolean): void => {
    hasSentEmail.value = value
  }

  return readonly({
    lastLoginAttemptEmail,
    hasSentEmail,
    setLastLoginAttemptEmail,
    setHasSentEmail,
  })
})
