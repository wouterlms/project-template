<script setup lang="ts">
import {
  AppToasts,
  createTheme,
} from '@wouterlms/ui'

createTheme({
  icons: {},
  colors: {},
  enableDarkMode: true,
})
</script>

<template>
  <RouterView />
  <AppToasts />
</template>
