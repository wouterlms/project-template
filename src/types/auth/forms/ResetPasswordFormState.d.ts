export default interface ResetPasswordFormState {
  token: {
    value: string
    returns: string
  }
  email: {
    value: string
    returns: string
  }
  password: {
    value: Nullable<string>
    returns: string
  }
}
