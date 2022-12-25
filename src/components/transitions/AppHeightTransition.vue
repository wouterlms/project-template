<script setup lang="ts">
interface Props {
  duration?: number
}

const props = withDefaults(defineProps<Props>(), {
  duration: 500,
})

const heightTransition = computed(() => `${props.duration}ms`)

const handleEnter = (element: HTMLElement): void => {
  const { width } = getComputedStyle(element)

  element.style.width = width
  element.style.position = 'absolute'
  element.style.visibility = 'hidden'
  element.style.height = 'auto'

  const { height } = getComputedStyle(element)

  element.style.width = ''
  element.style.position = ''
  element.style.visibility = ''
  element.style.height = '0'

  // eslint-disable-next-line no-unused-expressions
  getComputedStyle(element).height

  requestAnimationFrame(() => {
    element.style.height = height
  })
}

const handleAfterEnter = (element: HTMLElement): void => {
  element.style.height = 'auto'
}

const handleLeave = (element: HTMLElement): void => {
  const { height } = getComputedStyle(element)

  element.style.height = height

  // eslint-disable-next-line no-unused-expressions
  getComputedStyle(element).height

  requestAnimationFrame(() => {
    element.style.height = '0'
  })
}
</script>

<template>
  <Transition
    name="height"
    enter-from-class="opacity-0"
    leave-to-class="opacity-0"
    @enter="handleEnter"
    @after-enter="handleAfterEnter"
    @leave="handleLeave"
  >
    <slot />
  </Transition>
</template>

<style scoped lang="scss">
* {
  will-change: height;
  transform: translateZ(0);
  backface-visibility: hidden;
  perspective: 1000px;
}

.height {
  &-enter-active,
  &-leave-active {
    transition: v-bind(heightTransition);
    overflow: hidden;
  }

  &-enter-from,
  &-leave-to {
    height: 0;
    transform: translateX(100%) !important;
  }
}
</style>
