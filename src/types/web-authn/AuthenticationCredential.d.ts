export default interface AuthenticationCredential {
  id: string
  authenticatorAttachment: 'platform'
  type: 'public-key'
  rawId: ArrayBuffer
  response: {
    authenticatorData: ArrayBuffer
    clientDataJSON: ArrayBuffer
    signature: ArrayBuffer
    userHandle: ArrayBuffer
  }
}
