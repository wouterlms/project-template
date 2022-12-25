<script setup lang="ts">
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
</script>

<template>
  <AppPageLoader />
  <RouterView />
  <AppToasts />
</template>
