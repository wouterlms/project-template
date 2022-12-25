<script setup lang="ts">
import type { Props as BaseProps } from './useAppTab'
import useAppTab from './useAppTab'

interface Props extends BaseProps {}

withDefaults(defineProps<Props>(), {})

const { tab, state } = useAppTab()
</script>

<template>
  <Component
    :is="tab"
    :class="[
      state.isSelected ? 'text-primary' : 'text-tertiary',
    ]"
    class="duration-200
      font-medium
      px-5
      py-1.5
      relative
      text-sm
      whitespace-nowrap"
  >
    <slot />
  </Component>
</template>
