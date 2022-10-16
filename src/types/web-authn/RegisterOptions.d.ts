interface Rp {
  name: string
  id: string
}

interface User {
  id: string
  name: string
  displayName: string
}

interface PubKeyCredParam {
  alg: number
  type: 'public-key'
}

interface ExcludeCredential {
  id: string
  type: 'public-key'
}

interface AuthenticatorSelection {
  requireResidentKey: boolean
  userVerification: UserVerificationRequirement
}

export default interface RegisterOptions {
  challenge: string
  rp: Rp
  user: User
  pubKeyCredParams: PubKeyCredParam[]
  timeout: number
  attestation: AttestationConveyancePreference
  excludeCredentials: ExcludeCredential[]
  authenticatorSelection: AuthenticatorSelection
}