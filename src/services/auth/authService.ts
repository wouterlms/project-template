import axios from 'axios'
import type { AxiosResponse } from 'axios'

import type { OAuth, Profile } from '@/types'

const {
  VITE_CLIENT_ID,
  VITE_CLIENT_SECRET,
} = import.meta.env

export const getProfile = async (): Promise<AxiosResponse<Profile>> => (
  await axios.get('/users/me')
)

export const login = async (
  email: string,
  password: string
): Promise<AxiosResponse<OAuth>> => await axios({
  url: '/oauth/token',
  method: 'POST',
  data: {
    password,
    username: email,
    grant_type: 'password',
    client_id: VITE_CLIENT_ID,
    client_secret: VITE_CLIENT_SECRET,
  },
  baseURL: import.meta.env.VITE_API_BASE_URL as string,
})

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
