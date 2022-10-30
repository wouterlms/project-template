<script setup lang="ts">
import axios from 'axios'

import {
  AppToasts,
  colors,
  createTheme,
  useToasts,
} from '@wouterlms/ui'

import { Icon } from '@wouterlms/icons'

createTheme({
  colors: {},
  enableDarkMode: true,
})

const { createToast } = useToasts()

axios.interceptors.response.use(
  (r) => r,
  (e) => {
    const { response } = e

    if (response.status >= 500) {
      createToast({
        title: 'Server error',
        message: 'Something went wrong.',
        accentColor: colors.value.accent.error,
        icon: Icon.INDICES_EXCLAMATIONMARK_CIRCLE,
      })
    }

    return Promise.reject(e)
  },
)
</script>

<template>
  <RouterView />
  <AppToasts />
</template>
