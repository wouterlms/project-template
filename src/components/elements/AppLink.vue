<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'
import { AppFocusable } from '@wouterlms/ui'

interface Props {
  to: RouteLocationRaw
  underline?: boolean
}

withDefaults(defineProps<Props>(), {
  underline: true,
})
</script>

<template>
  <AppFocusable
    :to="to"
    class="hover:underline"
    :class="[
      {
        underline,
      },
    ]"
    as="RouterLink"
  >
    <slot />
  </AppFocusable>
</template>
