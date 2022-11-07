<script setup lang="ts">
import { AppToasts, createTheme } from '@wouterlms/ui'
import { useTitle } from '@wouterlms/composables'

import { usePageTitle, useServerErrorInterceptor } from '@/composables'

createTheme({
  colors: {
    accent: {
      primary: ['#000000', '#ffffff'],
    },
  },
  enableDarkMode: true,
})

const { setTemplate } = useTitle()

useServerErrorInterceptor()
usePageTitle()

setTemplate('{title} | App')
</script>

<template>
  <AppPageLoader />
  <RouterView />
  <AppToasts />
</template>
