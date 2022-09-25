import { AxiosError } from 'axios'
import type { Ref } from 'vue'

interface Error {
  status: number
  message: Nullable<string>
}

export default (): Ref<Nullable<Error>> => {
  const error = ref<Nullable<Error>>(null)

  onErrorCaptured((e) => {
    if (e instanceof AxiosError) {
      const { response } = e

      if (response == null)
        return

      const { status, data: { message } } = response

      error.value = {
        status,
        message: message ?? null,
      }
    }
    else { throw e }

    return false
  })

  return error
}
