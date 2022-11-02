import axios from 'axios'

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
      const { response } = err

      if (response.status >= 500) {
        createToast({
          title: 'Server error',
          message: 'Something went wrong.',
          accentColor: colors.value.accent.error,
          icon: Icon.INDICES_EXCLAMATIONMARK_CIRCLE,
        })
      }

      return await Promise.reject(err)
    },
  )
}
