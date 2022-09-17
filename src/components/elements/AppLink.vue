<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'
import { AppFocusable } from '@wouterlms/ui'

interface Props {
  to: RouteLocationRaw
}

withDefaults(defineProps<Props>(), {})
</script>

<template>
  <AppFocusable
    is="RouterLink"
    :to="to"
    class="underline"
  >
    <slot />
  </AppFocusable>
</template>
