import axios from 'axios'
import type { AxiosResponse } from 'axios'
import type { ForgotPasswordDTO, ResetPasswordDTO } from '@/types'

export const forgotPassword = async (
  { email }: ForgotPasswordDTO,
): Promise<AxiosResponse<Record<string, never>>> => (
  await axios.post('/forgot-password', { email })
)

export const resetPassword = async (
  data: ResetPasswordDTO,
): Promise<AxiosResponse<Record<string, never>>> => (
  await axios.post('/reset-password', {
    ...data,
    confirmPassword: data.password,
  })
)
