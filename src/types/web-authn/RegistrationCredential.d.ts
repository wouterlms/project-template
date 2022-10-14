export default interface RegistrationCredential {
  id: string
  authenticatorAttachment: 'platform'
  type: 'public-key'
  rawId: ArrayBuffer
  response: {
    clientDataJSON: ArrayBuffer
    attestationObject: ArrayBuffer
  }
}
