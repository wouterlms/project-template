<script setup lang="ts">
import {
  AppToasts,
  createTheme,
} from '@wouterlms/ui'

import { icons } from '@/icons'
import { useWebAuthn } from '@/composables'

createTheme({
  icons,
  colors: {},
  enableDarkMode: true,
})

const { registerDevice, authenticate } = useWebAuthn()
</script>

<template>
  <RouterView />
  <AppToasts />

  <div class="flex flex-col-2 gap-x-4">
    <button type="button" @click="registerDevice">
      register
    </button>

    <button type="button" @click="authenticate">
      authenticate
    </button>
  </div>
</template>
