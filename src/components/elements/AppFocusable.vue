<script setup lang="ts">
interface Props {
  as?: string | Object
}

withDefaults(defineProps<Props>(), {
  as: 'button',
})
</script>

<template>
  <Component
    :is="as"
    type="button"
    class="duration-200 outline-inherit outline-offset-[3px] rounded"
  >
    <slot />
  </Component>
</template>
