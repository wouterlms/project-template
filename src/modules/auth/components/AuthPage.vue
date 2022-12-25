<script setup lang="ts">
interface Props {
  title: string
  description: string
}

withDefaults(defineProps<Props>(), {})
</script>

<template>
  <div>
    <AppText
      variant="display-2"
      class="font-medium"
    >
      {{ title }}
    </AppText>

    <AppText
      v-if="description"
      variant="body-2"
      class="mt-2"
    >
      {{ description }}
    </AppText>

    <div class="mt-6">
      <slot />
    </div>
  </div>
</template>
