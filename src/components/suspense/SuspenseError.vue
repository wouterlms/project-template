<script setup lang="ts">
interface Props {
  message: string
  status: number
}

withDefaults(defineProps<Props>(), {})
</script>

<template>
  <div>
    {{ message }} ({{ status }})
  </div>
</template>
