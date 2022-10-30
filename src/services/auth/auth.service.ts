import { http } from '@/http'
import type { ForgotPasswordDTO, ResetPasswordDTO } from '@/types'

export const forgotPassword = async (
  data: ForgotPasswordDTO,
): Promise<Record<string, never>> => (
  await http.post('/forgot-password', data)
)

export const resetPassword = async (
  data: ResetPasswordDTO,
): Promise<Record<string, never>> => (
  await http.post('/reset-password', {
    ...data,
    confirmPassword: data.password,
  })
)
