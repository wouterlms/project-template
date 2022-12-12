<script setup lang="ts">
import type { RouterLinkProps } from 'vue-router'
import type { NamedRoute } from '@/types'

interface Props extends RouterLinkProps {
  to: NamedRoute | string
}

withDefaults(defineProps<Props>(), {})
</script>

<template>
  <RouterLink :to="to">
    <slot />
  </RouterLink>
</template>
