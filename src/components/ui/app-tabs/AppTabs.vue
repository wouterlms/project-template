<script setup lang="ts">
import type { Props as BaseProps } from './useAppTabs'
import useAppTabs from './useAppTabs'

interface Props extends BaseProps {}

withDefaults(defineProps<Props>(), {})

const { tabs, state } = useAppTabs()
</script>

<template>
  <Component :is="tabs">
    <div class="inline-flex relative">
      <div
        :style="state.style"
        class="bg-neutral-100 h-full rounded"
      />

      <slot />
    </div>
  </Component>
</template>
