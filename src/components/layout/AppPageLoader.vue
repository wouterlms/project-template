<script setup lang="ts">
import { usePageLoader } from '@/composables'

const { progress, showProgressBar } = usePageLoader()

const transitionDuration = ref(1000)

watch(progress, () => {
  if (progress.value === 0) {
    transitionDuration.value = 0

    setTimeout(() => {
      transitionDuration.value = 1000
    }, 0)
  }
})
</script>

<template>
  <Transition name="transition">
    <div
      v-if="showProgressBar"
      class="fixed h-[3px] left-0 top-0 w-full z-30"
    >
      <div
        class="bg-accent-primary h-full"
        :style="{
          transition: 'cubic-bezier(0.25, 0.19, 0.01, 0.98)',
          width: `${progress}%`,
          transitionDuration: `${transitionDuration}ms`,
        }"
      />
    </div>
  </Transition>
</template>

<style scoped lang="scss">
.transition {
  &-enter-active {
    transition: 0.3s;
  }

  &-leave-active {
    transition: 1s;
  }

  &-enter,
  &-leave-to {
    opacity: 0;
  }
}
</style>
