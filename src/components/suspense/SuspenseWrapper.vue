<script setup lang="ts">
import type { Component } from 'vue'
import { AppLoader } from '@wouterlms/ui'

import { useSuspense } from '@/composables'

interface Props {
  component: Component
}

withDefaults(defineProps<Props>(), {})

const { t } = useI18n()
const error = useSuspense()
</script>

<template>
  <Suspense v-if="error === null">
    <Component :is="component" />

    <template #fallback>
      <CenterContent>
        <AppLoader>
          {{ t('general.loading') }}
        </AppLoader>
      </CenterContent>
    </template>
  </Suspense>

  <SuspenseError
    v-else
    :message="error.message"
    :status="error.status"
  />
</template>
