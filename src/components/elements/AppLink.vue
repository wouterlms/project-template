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
    :to="to"
    as="RouterLink"
    class="underline"
  >
    <slot />
  </AppFocusable>
</template>
