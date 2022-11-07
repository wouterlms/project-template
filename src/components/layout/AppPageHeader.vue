<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'

interface Props {
  title: string
  breadcrumbs?: {
    label: string
    to?: RouteLocationRaw
  }[]
}

withDefaults(defineProps<Props>(), {
  breadcrumbs: () => [],
})
</script>

<template>
  <header class="border-b border-primary border-solid mb-12 py-6">
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

        <AppTypography
          variant="display-2"
          class="font-medium"
        >
          {{ title }}
        </AppTypography>
      </div>

      <slot name="right" />
    </AppContainer>
  </header>
</template>
