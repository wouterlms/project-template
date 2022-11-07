import { defineStore } from 'pinia'

export default defineStore('forgotPassword', () => {
  const hasResetPassword = ref(false)

  const setHasResetPassword = (value: boolean): void => {
    hasResetPassword.value = value
  }

  return readonly({
    hasResetPassword,
    setHasResetPassword,
  })
})
