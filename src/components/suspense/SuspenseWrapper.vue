<script setup lang="ts">
import { useSuspense } from '@/composables'

const { t } = useI18n()
const error = useSuspense()
</script>

<template>
  <Suspense v-if="error === null">
    <slot />

    <template #fallback>
      <CenterContent>
        <AppLoader>
          {{ t('suspense.loading') }}
        </AppLoader>
      </CenterContent>
    </template>
  </Suspense>

  <CenterContent v-else>
    <SuspenseError
      :message="error.message"
      :status="error.status"
    />
  </CenterContent>
</template>
