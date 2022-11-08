import { AxiosError } from 'axios'

interface AxiosErrorData {
  message: string
  errors: Record<string, string[]>
}

// @ts-expect-error + operator cannot be used
// eslint-disable-next-line @typescript-eslint/restrict-plus-operands
export const uuid = (): string => ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
  (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16),
)

export const handleApiError = (error: unknown): Record<string, string> => {
  if (!(error instanceof AxiosError))
    throw error

  const { response } = error

  if (response === undefined)
    return {}

  const { data } = response
  const { errors } = data as AxiosErrorData

  const mappedErrors: Record<string, string> = {}

  for (const key in errors)
    [mappedErrors[key]] = errors[key]

  return mappedErrors
}
