<script setup lang="ts">
interface Props {
  title: string
  description: string
}

withDefaults(defineProps<Props>(), {})
</script>

<template>
  <div>
    <h1 class="font-medium text-2xl">
      {{ title }}
    </h1>

    <p
      v-if="description"
      class="mt-2"
    >
      {{ description }}
    </p>

    <div class="mt-4">
      <slot />
    </div>
  </div>
</template>
