<script setup lang="ts">
import type { Props as BaseProps } from './useFormInput'

import useFormInput from './useFormInput'

import {
  useBorderRadius,
  useComponentAttrs,
  useIsKeyboardMode,
} from '@/composables/ui'

import { icons } from '@/icons'
import { colors } from '@/theme'
import type { Rounded } from '@/types'

interface Props extends BaseProps {
  /**
   * Input error
   */
  hasError?: boolean

  /**
   * Left icon
   */
  iconLeft?: string

  /**
   * Right icon
   */
  iconRight?: string

  /**
   * Icon left size
   */
  iconLeftSize?: string

  /**
   * Icon right size
   */
  iconRightSize?: string

  /**
   * Border color
   */
  borderColor?: string

  /**
   * Input padding
   */
  padding?: string

  /**
   * Border radius
   */
  rounded?: Rounded
}

const props = withDefaults(defineProps<Props>(), {
  hasError: false,
  iconLeft: undefined,
  iconRight: undefined,
  iconLeftSize: '0.9375em',
  iconRightSize: '0.9375em',
  borderColor: undefined,

  padding: '0.6em',
  rounded: 'default',
})

const {
  input,
  state,
  togglePassword,
} = useFormInput()

const {
  listenerAttrs,
  nonStylingAttrs,
  stylingAttrs,
} = useComponentAttrs()

const isKeyboardMode = useIsKeyboardMode()

const iconColor = computed<string>(() => {
  const { hasError } = props

  if (hasError)
    return colors.value.accent.danger[500]

  return colors.value.text.tertiary
})

const color = computed<string>(() => {
  const { hasError } = props
  const { isDisabled } = state.value

  if (isDisabled)
    return colors.value.text.inputDisabled

  if (hasError)
    return colors.value.accent.danger[500]

  return colors.value.text.input
})

const borderColor = computed<string>(() => {
  const { hasError, borderColor } = props
  const { isFocused } = state.value

  if (hasError)
    return colors.value.accent.danger[500]

  if (isFocused)
    return colors.value.accent.primary[500]

  return borderColor ?? colors.value.border.input
})

const backgroundColor = computed<string>(() => {
  const { isDisabled } = state.value

  if (isDisabled === true)
    return colors.value.background.inputDisabled

  return colors.value.background.input
})
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<template>
  <label
    v-bind="stylingAttrs"
    :class="{
      'opacity-50': state.isDisabled,
      'border-error': hasError,
    }"
    :style="{
      borderColor,
      color,
      backgroundColor,
      outlineColor: state.isFocused && isKeyboardMode
        ? borderColor
        : 'transparent',
      borderRadius: useBorderRadius(),
    }"
    class="border border-solid duration-200 flex items-center outline outline-2 outline-offset-2"
  >
    <AppIcon
      v-if="iconLeft"
      :icon="iconLeft"
      :style="{
        width: iconLeftSize,
        color: iconColor,
      }"
      class="flex-shrink-0 ml-[0.625em]"
    />

    <slot name="left" />

    <slot
      v-if="$slots.input"
      name="input"
    />

    <Component
      v-bind="{
        ...listenerAttrs,
        ...nonStylingAttrs,
        type: state.isPasswordVisible ? 'text' : state.type,
      }"
      :is="input"
      :class="{
        'absolute opacity-0 pointer-events-none': $slots.input,
      }"
      :style="{
        padding,
      }"
      class="!outline-none w-full"
    />

    <slot name="right" />

    <AppLoader
      v-if="state.isLoading"
      :accent-color="colors.text.input"
      class="mr-[1em] text-[0.8em]"
    />

    <AppIcon
      v-else-if="iconRight"
      :icon="iconRight"
      :style="{
        width: iconRightSize,
        color: iconColor,
      }"
      class="flex-shrink-0 mr-[0.625em]"
    />

    <AppButton
      v-else-if="state.type === 'password'"
      :icon-left="state.isPasswordVisible
        ? icons.EYE
        : icons.EYE_SLASH"
      :is-disabled="state.isDisabled || state.isReadonly"
      :accent-color="color"
      rounded="sm"
      variant="ghost"
      padding="0.2em"
      class="mr-[0.5em]"
      @click="togglePassword"
    />
  </label>
</template>

<style scoped lang="scss">
:deep input,
:deep textarea {
  &::placeholder {
    @apply text-input-placeholder;
  }
}
</style>
