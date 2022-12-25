import { AxiosError } from 'axios'

interface AxiosErrorData {
  message: string
  errors: Record<string, string[]>
}

export default (error: unknown): Record<string, string> => {
  if (!(error instanceof AxiosError))
    throw error

  const { response } = error

  if (response == null)
    return {}

  const { data } = response
  const { errors } = data as AxiosErrorData

  const mappedErrors = Object.entries(errors).reduce((acc, [key]) => ({
    ...acc,
    [key]: errors[key][0],
  }), {})

  return mappedErrors
}
