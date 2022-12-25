<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'

import { ARROWS_CHEVRON_RIGHT } from '@wouterlms/icons'

interface Props {
  to?: RouteLocationRaw
}

withDefaults(defineProps<Props>(), {
  to: undefined,
})
</script>

<template>
  <Component
    :is="!!to ? 'RouterLink' : 'div'"
    :to="to"
    :class="[!!to ? 'hover:underline text-secondary' : 'text-tertiary']"
    class="max-w-[12rem] text-sm truncate"
  >
    <slot />
  </Component>

  <AppIcon
    v-if="to"
    :icon="ARROWS_CHEVRON_RIGHT"
    class="h-auto mx-3 text-tertiary w-2.5"
  />
</template>
