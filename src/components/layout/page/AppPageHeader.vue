<script setup lang="ts">
import type { Breadcrumb } from '@/types'

interface Props {
  title: string
  breadcrumbs?: Breadcrumb[]
}

withDefaults(defineProps<Props>(), {
  breadcrumbs: () => [],
})
</script>

<template>
  <header class="border-b border-primary border-solid flex items-center mb-12 min-h-[8rem] py-6">
    <AppContainer class="flex items-center justify-between">
      <div>
        <AppBreadcrumbs
          v-if="breadcrumbs.length > 0"
          class="mb-2"
        >
          <AppBreadcrumbItem
            v-for="{ to, label } of breadcrumbs"
            :key="label"
            :to="to"
          >
            {{ label }}
          </AppBreadcrumbItem>
        </AppBreadcrumbs>

        <div class="flex items-center">
          <AppText
            variant="display-2"
            class="font-medium"
          >
            {{ title }}
          </AppText>

          <slot name="title" />
        </div>
      </div>

      <slot name="right" />
    </AppContainer>
  </header>
</template>
