import AuthenticationCredential from "./AuthenticationCredential";

export default interface AuthenticationCredentialJSON extends Omit<AuthenticationCredential, 'authenticatorAttachment'> {
  rawId: string
  response: {
    authenticatorData: string
    clientDataJSON: string
    signature: string
    userHandle: string
  }
}
