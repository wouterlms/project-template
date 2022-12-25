<script setup lang="ts">
import type { ComputedRef } from 'vue'

interface Props {
  as?: string
}

withDefaults(defineProps<Props>(), {
  as: 'div',
})

const grid = inject('grid') as ComputedRef<string>
</script>

<template>
  <Component
    :is="as"
    :class="grid"
    class="flex-shrink-0 gap-4 grid items-center sticky top-0 z-1"
  >
    <slot />
  </Component>
</template>
