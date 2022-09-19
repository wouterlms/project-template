import axios from 'axios'
import type { AxiosResponse } from 'axios'

export const forgotPassword = async (
  email: string
): Promise<AxiosResponse<Record<string, never>>> => (
  await axios.post('/forgot-password', { email })
)

export const resetPassword = async (data: {
  email: string
  password: string
  token: string
}): Promise<AxiosResponse<Record<string, never>>> => (
  await axios.post('/reset-password', {
    ...data,
    confirmPassword: data.password,
  })
)
