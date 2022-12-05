import { http } from '@/plugins'
import type { ForgotPasswordDto, ResetPasswordDto } from '@/types'

export const forgotPassword = async (
  data: ForgotPasswordDto,
): Promise<Record<string, never>> => (
  await http.post('/forgot-password', data)
)

export const resetPassword = async (
  data: ResetPasswordDto,
): Promise<Record<string, never>> => (
  await http.post('/reset-password', {
    ...data,
    confirmPassword: data.password,
  })
)
