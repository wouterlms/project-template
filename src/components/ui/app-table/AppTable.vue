<script setup lang="ts">
interface Props {
  grid: string
}

const props = withDefaults(defineProps<Props>(), {})

provide('grid', computed(() => props.grid))
</script>

<template>
  <slot />
</template>
