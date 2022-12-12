/* eslint-disable */  
import type { Route } from '@/enums'

interface Login {
  name: Route.LOGIN
}

interface ForgotPassword {
  name: Route.FORGOT_PASSWORD
}

interface ResetPassword {
  name: Route.RESET_PASSWORD
  params: {
    token: string | number
  }
}

type NamedRoute = Login | ForgotPassword | ResetPassword

export default NamedRoute
