<script setup lang="ts">
import { FocusTrap } from 'focus-trap-vue'

interface Props {
  isActive: boolean
}

withDefaults(defineProps<Props>(), {})
</script>

<template>
  <Teleport to="body">
    <FocusTrap :active="isActive">
      <div>
        <slot />
      </div>
    </FocusTrap>
  </Teleport>
</template>
