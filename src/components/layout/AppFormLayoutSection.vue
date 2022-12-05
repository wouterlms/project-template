<script setup lang="ts">
interface Props {
  title: string
  description: string
  showDivider?: boolean
}

withDefaults(defineProps<Props>(), {
  showDivider: false,
})
</script>

<template>
  <div
    :class="{
      'border-b border-primary border-solid pb-8 lg:pb-12': showDivider,
    }"
    :style="{
      gridTemplateColumns: '1.5fr 2fr',
    }"
    class="lg:gap-x-12 lg:grid"
  >
    <div>
      <AppTypography
        variant="headline"
        class="font-medium"
      >
        {{ title }}
      </AppTypography>

      <AppTypography
        variant="body-1"
        class="max-w-md mt-1 text-tertiary"
      >
        {{ description }}
      </AppTypography>
    </div>

    <div class="lg:mt-2 mt-6">
      <slot />
    </div>
  </div>
</template>
