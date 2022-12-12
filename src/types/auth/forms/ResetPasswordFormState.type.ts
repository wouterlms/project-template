export default interface ResetPasswordFormState {
  token: {
    value: string
    returns: string
  }
  email: {
    value: Nullable<string>
    returns: string
  }
  password: {
    value: Nullable<string>
    returns: string
  }
}
