<script setup lang="ts">
interface Props {
  shouldTruncate?: boolean
}

withDefaults(defineProps<Props>(), {
  shouldTruncate: true,
})
</script>

<template>
  <div
    :class="{
      truncate: shouldTruncate,
    }"
    class="leading-5 text-sm"
  >
    <slot />
  </div>
</template>
