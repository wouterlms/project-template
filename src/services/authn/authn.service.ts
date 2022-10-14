import type { AxiosResponse } from 'axios'
import axios from 'axios'

import type {
  AuthenticationCredentialJSON,
  AuthenticationOptions,
  RegisterOptions,
  RegistrationCredentialJSON,
} from '@/types'

export const getRegisterDeviceOptions = async (
  userId: string,
): Promise<AxiosResponse<RegisterOptions>> => (
  await axios.get(`/webauthn/generate/register/${userId}`)
)

export const registerDevice = async (
  userId: string,
  credentials: RegistrationCredentialJSON,
): Promise<AxiosResponse<unknown>> => (
  await axios.post('/webauthn/register', {
    ...credentials,
    userUuid: userId,
  })
)

export const getAuthenticationOptions = async (
  userId: string,
): Promise<AxiosResponse<AuthenticationOptions>> => (
  await axios.get(`/webauthn/generate/login/${userId}`)
)

export const login = async (
  userId: string,
  credentials: AuthenticationCredentialJSON,
): Promise<AxiosResponse<unknown>> => (
  await axios.post('/webauthn/login', {
    ...credentials,
    userUuid: userId,
  })
)
