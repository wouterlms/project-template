<script setup lang="ts">
import AppContainer from '@/components/layout/page/AppContainer.vue'

interface Props {
  hasMaxWidth?: boolean
}

withDefaults(defineProps<Props>(), {
  hasMaxWidth: true,
})
</script>

<template>
  <Component
    :is="hasMaxWidth ? AppContainer : 'div'"
    class="flex flex-1 flex-col h-full pb-4"
  >
    <slot />
  </Component>
</template>
