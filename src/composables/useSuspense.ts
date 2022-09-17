import { AxiosError } from 'axios'
import type { Ref } from 'vue'

interface Error {
  message: string
  status: number
}

export default (): Ref<Nullable<Error>> => {
  const error = ref<Nullable<Error>>(null)

  onErrorCaptured((e) => {
    if (e instanceof AxiosError) {
      const { response } = e

      if (response == null) return

      const { status, data: { message } } = response

      error.value = {
        message,
        status,
      }
    } else throw e

    return false
  })

  return error
}
