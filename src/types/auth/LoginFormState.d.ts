export default interface LoginForm {
  email: {
    value: Nullable<string>
    returns: string
  }
  password: {
    value: Nullable<string>
    returns: string
  }
}
