<script setup lang="ts">
interface Props {
  title: string
  description: string
}

withDefaults(defineProps<Props>(), {})
</script>

<template>
  <div>
    <AppTypography
      variant="display-2"
      class="font-medium"
    >
      {{ title }}
    </AppTypography>

    <AppTypography
      v-if="description"
      variant="body-2"
      class="mt-1"
    >
      {{ description }}
    </AppTypography>

    <div class="mt-6">
      <slot />
    </div>
  </div>
</template>
