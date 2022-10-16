export default interface RegisterOptions {
  challenge: string
  rp: {
    name: string
    id: string
  }
  user: {
    id: string
    name: string
    displayName: string
  }
  pubKeyCredParams: {
    alg: number
    type: 'public-key'
  }[]
  timeout: number
  attestation: AttestationConveyancePreference
  excludeCredentials: {
    id: string
    type: 'public-key'
  }[]
  authenticatorSelection: {
    requireResidentKey: boolean
    userVerification: UserVerificationRequirement
  }
}