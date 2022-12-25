<script setup lang="ts">
import { colors } from '@/theme'

interface Props {
  accentColor?: string
}

const props = withDefaults(defineProps<Props>(), {
  accentColor: undefined,
})

const computedAccentColor = computed<string>(() => (
  props.accentColor ?? colors.value.text.primary
))
</script>

<template>
  <div class="flex flex-col items-center">
    <div
      :style="{
        borderColor: `${computedAccentColor}50`,
        borderRightColor: computedAccentColor,
        borderTopColor: computedAccentColor,
      }"
      class="border border-solid h-[1em] rounded-full spin text-center w-[1em]"
    />

    <div
      v-if="$slots.default"
      class="mt-1 text-secondary text-xs"
    >
      <slot />
    </div>
  </div>
</template>

<style scoped lang="scss">
.spin {
  animation: spin 600ms infinite linear;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
