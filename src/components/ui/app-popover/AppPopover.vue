<script setup lang="ts">
import { useEventListener } from '@wouterlms/composables'

import type { Placement } from '@floating-ui/dom'

import { useBorderRadius, useFloatingUI } from '@/composables/ui'

import { clickOutside as vClickOutside } from '@/directives'

import { colors } from '@/theme'
import type { Rounded } from '@/types'

interface Props {
  position?: Placement
  margin?: number
  offset?: number
  containerPadding?: number
  inheritWidth?: boolean
  showArrow?: boolean
  container?: HTMLElement
  rounded?: Rounded
  backgroundColor?: string
}

const props = withDefaults(defineProps<Props>(), {
  position: 'bottom',
  margin: 0,
  offset: 0,
  containerPadding: 10,
  inheritWidth: false,
  showArrow: true,
  container: undefined,
  rounded: 'default',
  backgroundColor: undefined,
})

const isPopoverVisible = ref(false)
const previouslyFocusedElement = ref<HTMLElement | null>(null)

const container = ref<HTMLElement | null>(null)
const button = ref<HTMLElement | null>(null)
const popover = ref<HTMLElement | null>(null)
const arrow = ref<HTMLElement | null>(null)

const {
  actualPosition,
  positionX,
  positionY,
  arrowPositionX,
  arrowPositionY,
  width,
} = useFloatingUI({
  isFloatingElementVisible: computed(() => isPopoverVisible.value),
  floatingEl: computed(() => popover.value ?? null),
  referenceEl: computed(() => button.value ?? null),
  arrowEl: computed(() => arrow.value ?? null),
  options: reactive({
    margin: props.margin,
    offset: props.offset,
    position: props.position,
    container: props.container ?? document.body,
    containerPadding: props.containerPadding,
  }),
})

onMounted(() => {
  const children = container.value?.children ?? []

  if (children.length !== 1)
    throw new Error('<AppPopover> must have exactly one element in <slot>')

  button.value = children[0] as HTMLElement

  button.value.addEventListener('click', () => {
    isPopoverVisible.value = !isPopoverVisible.value
  })
})

const computedBackgroundColor = computed<string>(() => (
  props.backgroundColor ?? colors.value.background.primary
))

const closeAndFocusButton = (): void => {
  if (isPopoverVisible.value) {
    isPopoverVisible.value = false
    button.value?.focus()
  }
}

useEventListener('keydown', ({ key }: KeyboardEvent) => {
  if (key === 'Escape')
    closeAndFocusButton()
})

watch(isPopoverVisible, (isPopoverVisible) => {
  if (isPopoverVisible)
    previouslyFocusedElement.value = document.activeElement as HTMLElement
})

useEventListener(document, 'focusin', () => {
  if (!isPopoverVisible.value || popover.value === null)
    return

  const activeElement = document.activeElement as HTMLElement | null
  const isFocusInPopover = popover.value.contains(activeElement) || activeElement === button.value

  if (!isFocusInPopover)
    isPopoverVisible.value = false
})
</script>

<template>
  <div ref="container">
    <slot />

    <Transition name="popover">
      <div
        v-if="isPopoverVisible"
        ref="popover"
        v-click-outside="() => isPopoverVisible = false"
        :style="{
          [actualPosition]: 'auto',
          top: `${positionY}px`,
          left: `${positionX}px`,
          width: inheritWidth ? `${width}px` : undefined,
          backgroundColor: computedBackgroundColor,
          borderRadius: useBorderRadius(),
        }"
        class="absolute shadow-primary"
      >
        <div
          v-show="showArrow"
          ref="arrow"
          :style="{
            backgroundColor: computedBackgroundColor,
            left: arrowPositionX !== null ? `${arrowPositionX}px` : '',
            top: arrowPositionY !== null ? `${arrowPositionY}px` : '',
            right: '',
            bottom: '',
            [actualPosition]: '-4px',
          }"
          class="absolute h-3 rotate-45 rounded-sm shadow-primary w-3"
        />

        <div
          :style="{
            backgroundColor: computedBackgroundColor,
            borderRadius: useBorderRadius(),
          }"
          class="h-full left-0 overflow-hidden relative top-0 w-full z-[1]"
        >
          <slot
            name="popover"
            :close="closeAndFocusButton"
          />
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped lang="scss">
.popover {
  &-enter-active,
  &-leave-active {
    transition-property: transform, opacity;
    transition-duration: 0.2s;
    transition-timing-function: cubic-bezier(0.22, 0.68, 0, 1.51);
  }

  &-enter-from,
  &-leave-to {
    opacity: 0;
    transform: scale(0.96);
  }
}
</style>
