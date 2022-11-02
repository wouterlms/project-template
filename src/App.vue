<script setup lang="ts">
import { AppToasts, createTheme } from '@wouterlms/ui'
import { useTitle } from '@wouterlms/composables'

import { usePageTitle, useServerErrorInterceptor } from '@/composables'

createTheme({
  colors: {},
  enableDarkMode: true,
})

useServerErrorInterceptor()
usePageTitle()

const { setTemplate } = useTitle()

setTemplate('{title} | App')
</script>

<template>
  <RouterView />
  <AppToasts />
</template>
