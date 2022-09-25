<script setup lang="ts">
interface Props {
  direction?: 'horizontal' | 'vertical'
  gap?: number
}

withDefaults(defineProps<Props>(), {
  direction: 'vertical',
  gap: 4,
})
</script>

<template>
  <div
    :class="{
      'flex-col': direction === 'vertical',
    }"
    :style="{
      gap: `${gap / 4}rem`,
    }"
    class="flex"
  >
    <slot />
  </div>
</template>
