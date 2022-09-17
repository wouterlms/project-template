<script setup lang="ts">
import { createTheme } from '@wouterlms/ui'
import { icons } from '@/icons'

createTheme({
  icons,
  colors: {},
  enableDarkMode: true,
})
</script>

<template>
  <RouterView />
</template>
