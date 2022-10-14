export default interface AuthenticationOptions {
  challenge: string
  timeout: number
  userVerification: UserVerificationRequirement
  allowCredentials: {
    id: string
    type: 'public-key'
  }[]
}
