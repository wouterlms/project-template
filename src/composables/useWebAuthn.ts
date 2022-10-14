import { authnService } from '@/services'

import type {
  AuthenticationCredential,
  AuthenticationCredentialJSON,
  AuthenticationOptions,
  RegisterOptions,
  RegistrationCredential,
  RegistrationCredentialJSON,
} from '@/types'

type UseWebAuthn = () => {
  isSupported: boolean
  registerDevice: () => Promise<void>
  authenticate: () => Promise<void>
}

const userId = 'e6a9de9d-5a24-4f2f-b4c6-29826e87ecd4'

const useWebAuthn: UseWebAuthn = () => {
  const isSupported = 'credentials' in navigator

  const base64URLStringToBuffer = (base64URLString: string): ArrayBuffer => {
    const base64 = base64URLString.replace(/-/g, '+').replace(/_/g, '/')

    const padLength = (4 - (base64.length % 4)) % 4
    const padded = base64.padEnd(base64.length + padLength, '=')

    const binary = atob(padded)

    const buffer = new ArrayBuffer(binary.length)
    const bytes = new Uint8Array(buffer)

    for (let i = 0; i < binary.length; i++)
      bytes[i] = binary.charCodeAt(i)

    return buffer
  }

  const bufferToBase64URLString = (buffer: ArrayBuffer): string => {
    const bytes = new Uint8Array(buffer)
    let str = ''

    for (const charCode of bytes)
      str += String.fromCharCode(charCode)

    const base64String = btoa(str)

    return base64String.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '')
  }

  const registerCredential = async (
    options: RegisterOptions,
  ): Promise<RegistrationCredentialJSON> => {
    const decodedOptions = {
      ...options,
      challenge: base64URLStringToBuffer(options.challenge),
      user: {
        ...options.user,
        id: base64URLStringToBuffer(options.user.id),
      },
      excludeCredentials: options.excludeCredentials.map((c) => ({
        ...c,
        id: base64URLStringToBuffer(c.id),
      })),
    }

    const credential = await navigator.credentials.create({
      publicKey: decodedOptions,
    })

    if (credential === null)
      throw new Error('Registration was not completed')

    const {
      id,
      rawId,
      response,
      type,
    } = credential as RegistrationCredential

    const registrationCreditentialJSON: RegistrationCredentialJSON = {
      id,
      type,
      rawId: bufferToBase64URLString(rawId),
      response: {
        clientDataJSON: bufferToBase64URLString(response.clientDataJSON),
        attestationObject: bufferToBase64URLString(response.attestationObject),
      },
    }

    return registrationCreditentialJSON
  }

  const authenticateCredential = async (
    options: AuthenticationOptions,
  ): Promise<AuthenticationCredentialJSON> => {
    if (options.allowCredentials.length === 0)
      throw new Error('No credentials')

    const decodedOptions = {
      ...options,
      challenge: base64URLStringToBuffer(options.challenge),
      allowCredentials: options.allowCredentials.map((c) => ({
        ...c,
        id: base64URLStringToBuffer(c.id),
      })),
    }

    const credentials = await navigator.credentials.get({
      publicKey: decodedOptions,
    })

    if (credentials === null)
      throw new Error('Authentication was not completed')

    const {
      id,
      rawId,
      type,
      response,
    } = credentials as AuthenticationCredential

    const authenticationCredentialJSON: AuthenticationCredentialJSON = {
      id,
      type,
      rawId: bufferToBase64URLString(rawId),
      response: {
        authenticatorData: bufferToBase64URLString(response.authenticatorData),
        clientDataJSON: bufferToBase64URLString(response.clientDataJSON),
        signature: bufferToBase64URLString(response.signature),
        userHandle: bufferToBase64URLString(response.userHandle),
      },
    }

    return authenticationCredentialJSON
  }

  const registerDevice = async (): Promise<void> => {
    if (!isSupported)
      throw new Error('WebAuthn is not supported')

    const { data: registrationOptions } = await authnService.getRegisterDeviceOptions(userId)

    try {
      const credentials = await registerCredential(registrationOptions)
      await authnService.registerDevice(userId, credentials)
    }
    catch {
      // TODO: Either user canceled or something went wrong
    }
  }

  const authenticate = async (): Promise<void> => {
    const { data } = await authnService.getAuthenticationOptions(userId)

    try {
      const credentials = await authenticateCredential(data)
      await authnService.login(userId, credentials)
    }
    catch {
      // TODO: Either user canceled or something went wrong
    }
  }

  return {
    isSupported,
    registerDevice,
    authenticate,
  }
}

export default useWebAuthn
