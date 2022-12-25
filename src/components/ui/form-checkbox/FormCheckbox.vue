<script setup lang="ts">
import { PRIVACY_AND_SECURITY_CHECKMARK } from '@wouterlms/icons'

import type { Props as BaseProps } from './useFormCheckbox'
import useFormCheckbox from './useFormCheckbox'

import {
  useBorderRadius,
  useColor,
  useComponentAttrs,
} from '@/composables/ui'

import { colors } from '@/theme'
import type { Rounded } from '@/types'

interface Props extends BaseProps {
  hasError?: boolean
  accentColor?: string
  backgroundColor?: string
  borderColor?: string

  rounded?: Rounded
}

const props = withDefaults(defineProps<Props>(), {
  hasError: false,
  rounded: 'sm',
  accentColor: undefined,
  backgroundColor: undefined,
  borderColor: undefined,
})

const { checkbox, state } = useFormCheckbox()

const slots = useSlots()
const { isDarkColor } = useColor()

const {
  listenerAttrs,
  nonStylingAttrs,
  stylingAttrs,
} = useComponentAttrs()

const computedAccentColor = computed<string>(
  () => props.accentColor ?? colors.value.accent.primary[500],
)

const computedBackgroundColor = computed<string>(() => {
  if (state.value.isChecked) {
    if (props.hasError)
      return colors.value.accent.danger[500]

    return computedAccentColor.value
  }

  return props.backgroundColor ?? colors.value.background.primary
})

const computedBorderColor = computed<string>(() => {
  if (props.hasError)
    return colors.value.accent.danger[500]

  const { isChecked, isFocused } = state.value

  if (isChecked || isFocused)
    return computedAccentColor.value

  return props.borderColor ?? colors.value.border.input
})

const computedTickColor = computed<string>(
  () => (
    isDarkColor(computedBackgroundColor.value)
      ? '#ffffff'
      : '#000000'
  ),
)
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<template>
  <Component
    v-bind="stylingAttrs"
    :is="slots.default ? 'label' : 'div'"
    class="flex items-center"
  >
    <Component
      v-bind="{
        ...nonStylingAttrs,
        ...listenerAttrs,
      }"
      :is="checkbox"
      :class="[
        {
          'opacity-50': state.isDisabled,
        },
      ]"
      :style="{
        backgroundColor: computedBackgroundColor,
        borderColor: computedBorderColor,
        borderRadius: useBorderRadius(),
        outlineColor: computedBorderColor,
      }"
      class="border-[1.5px]
        border-solid
        duration-200
        flex
        flex-shrink-0
        h-[1.125em]
        items-center
        justify-center
        outline-offset-[3px]
        w-[1.125em]"
    >
      <Transition name="tick-transition">
        <div v-if="state.isChecked">
          <AppIcon
            :icon="PRIVACY_AND_SECURITY_CHECKMARK"
            :style="{
              color: computedTickColor,
            }"
            class="w-[0.6875em]"
          />
        </div>
      </Transition>
    </Component>

    <span
      v-if="slots.default"
      :class="[
        hasError ? 'text-error' : 'text-secondary',
        {
          'opacity-50': state.isDisabled,
        },
      ]"
      class="ml-2"
    >
      <slot
        :is-checked="state.isChecked"
        :is-focused="state.isFocused"
        :is-disabled="state.isDisabled"
        :has-error="hasError"
      />
    </span>
  </Component>
</template>

<style scoped lang="scss">
.tick-transition {
  &-enter-active,
  &-leave-active {
    transition: 0.3s cubic-bezier(0.22, 0.68, 0, 1);
  }

  &-enter-from,
  &-leave-to {
    opacity: 0;
    transform: scale(0.5);
  }
}
</style>
