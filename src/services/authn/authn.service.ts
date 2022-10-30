import { http } from '@/http'

import type {
  AuthenticationCredentialJSON,
  AuthenticationOptions,
  RegisterOptions,
  RegistrationCredentialJSON,
} from '@/types'

export const getRegisterDeviceOptions = async (
  userId: string,
): Promise<RegisterOptions> => (
  await http.get(`/webauthn/generate/register/${userId}`)
)

export const registerDevice = async (
  userId: string,
  credentials: RegistrationCredentialJSON,
): Promise<unknown> => (
  await http.post('/webauthn/register', {
    ...credentials,
    userUuid: userId,
  })
)

export const getAuthenticationOptions = async (
  userId: string,
): Promise<AuthenticationOptions> => (
  await http.get(`/webauthn/generate/login/${userId}`)
)

export const login = async (
  userId: string,
  credentials: AuthenticationCredentialJSON,
): Promise<unknown> => (
  await http.post('/webauthn/login', {
    ...credentials,
    userUuid: userId,
  })
)
