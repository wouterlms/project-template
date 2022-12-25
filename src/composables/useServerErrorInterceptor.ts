import axios, { AxiosError } from 'axios'

import { useToasts } from '@/composables'

export default (): void => {
  const { showToastMessage } = useToasts()

  axios.interceptors.response.use(
    (res) => res,
    async (err) => {
      if (err instanceof AxiosError) {
        const { response } = err
        const { status, data } = response ?? {}

        if (status !== undefined && status >= 500)
          showToastMessage(data.message ?? 'Something went wrong')
      }

      return await Promise.reject(err)
    },
  )
}
