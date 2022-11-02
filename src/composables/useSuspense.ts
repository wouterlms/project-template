import { AxiosError } from 'axios'
import type { Ref } from 'vue'

interface Error {
  status: number
  message: Nullable<string>
}

export default (): Ref<Nullable<Error>> => {
  const error = ref<Nullable<Error>>(null)

  onErrorCaptured((err) => {
    if (err instanceof AxiosError) {
      const { response } = err

      if (response == null)
        return

      const { status, data: { message } } = response

      error.value = {
        status,
        message: message ?? null,
      }
    }
    else { throw err }

    return false
  })

  return error
}
