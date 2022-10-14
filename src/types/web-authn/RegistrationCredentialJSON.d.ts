import RegistrationCredential from "./RegistrationCredential";

export default interface RegistrationCredentialJSON extends Omit<RegistrationCredential, 'authenticatorAttachment'> {
  rawId: string;
  response: { 
    attestationObject: string; 
    clientDataJSON: string
  }
}
