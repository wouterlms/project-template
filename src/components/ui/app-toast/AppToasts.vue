<script setup lang="ts">
import { useToasts } from '@/composables/ui'

const { toast } = useToasts()

const showToast = computed(() => toast.value !== null)
</script>

<template>
  <Transition
    name="toast-transition"
    mode="out-in"
  >
    <div
      v-if="showToast"
      :key="toast.id"
      class="-translate-x-1/2
        bg-primary-inverted
        bottom-6
        fixed
        left-1/2
        px-2.5
        py-2
        rounded
        text-primary-inverted
        text-sm
        z-20"
    >
      {{ toast.message }}
    </div>
  </Transition>
</template>

<style scoped lang="scss">
.toast-transition {
  &-enter-active,
  &-leave-active {
    transition: 0.3s
  }

  &-enter-from,
  &-leave-to {
    opacity: 0;
  }

  &-enter-from {
    transform: translate(-50%, 70%);
  }
}
</style>
