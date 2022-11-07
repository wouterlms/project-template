import axios, { AxiosError } from 'axios'

import {
  colors,
  useToasts,
} from '@wouterlms/ui'

import { Icon } from '@wouterlms/icons'

export default (): void => {
  const { createToast } = useToasts()

  axios.interceptors.response.use(
    (res) => res,
    async (err) => {
      if (err instanceof AxiosError) {
        const { response } = err
        const { status, data } = response ?? {}

        if (status !== undefined && status >= 500) {
          createToast({
            title: 'Server error',
            message: data.message ?? 'Something went wrong',
            accentColor: colors.value.accent.error,
            icon: Icon.INDICES_EXCLAMATIONMARK_CIRCLE,
          })
        }
      }

      return await Promise.reject(err)
    },
  )
}
