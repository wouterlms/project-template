<script setup lang="ts">
interface Props {
  direction?: 'horizontal' | 'vertical'
  spacing?: number
}

withDefaults(defineProps<Props>(), {
  direction: 'vertical',
  spacing: 4,
})
</script>

<template>
  <div
    :class="{
      'flex-col': direction === 'vertical',
    }"
    :style="{
      gap: `${spacing / 4}rem`,
    }"
    class="flex"
  >
    <slot />
  </div>
</template>
