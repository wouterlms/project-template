<script setup lang="ts">
import {
  AppNotifications,
  AppToasts,
  createTheme,
} from '@wouterlms/ui'

import { useTitle } from '@wouterlms/composables'

import {
  usePageTitle,
  useServerErrorInterceptor,
} from '@/composables'

import { setDefaultValidationMessages } from '@/validation'

const { setTemplate } = useTitle()

useServerErrorInterceptor()
usePageTitle()
setDefaultValidationMessages()

setTemplate('{title} | App')

createTheme({
  colors: {
    accent: {
      primary: ['#000000', '#ffffff'],
    },
    background: {
      input: ['#ffffff', '#141414'],
      inputDisabled: ['#f7fafc', '#141414'],
    },
  },
  enableDarkMode: true,
})
</script>

<template>
  <AppPageLoader />
  <RouterView />
  <AppToasts />
  <AppNotifications />
</template>
