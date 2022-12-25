<script setup lang="ts">
import type { Props as BaseProps } from './useAppButton'
import useAppButton from './useAppButton'

import { useBorderRadius, useColor } from '@/composables/ui'
import { colors } from '@/theme'

import type { ButtonVariant, Rounded } from '@/types'

interface Props extends BaseProps {
  /**
   * Button color
   */
  accentColor?: string

  /**
   * Button styling
   */
  variant?: ButtonVariant

  /**
   * Show icon on the left side
   */
  iconLeft?: string

  /**
   * Show icon on the right side
   */
  iconRight?: string

  /**
   * The size of the icons
   */
  iconSize?: string

  /**
   * The space between the button icon and label
   */
  iconSpacing?: string

  /**
   * Button padding values
   * Defaults to `1em 1.2em`. Or `1em` when no slot content is passed
   */
  padding?: string

  /**
   * Border radius
   */
  rounded?: Rounded
}

const props = withDefaults(defineProps<Props>(), {
  accentColor: undefined,
  variant: 'solid',
  iconLeft: undefined,
  iconRight: undefined,
  iconSize: '0.875em',
  iconSpacing: '0.8em',

  padding: undefined,
  rounded: 'default',
})

const attrs = useAttrs()
const slots = useSlots()

const { button, state } = useAppButton()

const { isDarkColor } = useColor()

const computedAccentColor = computed<string>(
  () => props.accentColor ?? colors.value.accent.primary[500],
)

const textColor = computed<string>(
  () => (
    isDarkColor(computedAccentColor.value)
      ? '#ffffff'
      : '#000000'
  ),
)

const backgroundColor = computed<string>(() => {
  const { variant } = props

  if ([

    'outline',
    'ghost',
    'unstyled',
  ].includes(variant))
    return 'transparent'

  return computedAccentColor.value
})

const color = computed<string>(() => {
  const { variant } = props

  if ([
    'ghost',
    'outline',
  ].includes(variant))
    return computedAccentColor.value

  if (variant === 'unstyled')
    return colors.value.text.secondary

  return textColor.value
})

const borderColor = computed<string>(() => {
  const { variant } = props

  if ([
    'solid',
    'outline',
  ].includes(variant))
    return computedAccentColor.value

  return 'transparent'
})

const outlineColor = computed<string>(() => {
  const { variant } = props

  if (['unstyled', 'ghost'].includes(variant))
    return color.value

  return borderColor.value
})

const computedPadding = computed<string>(() => {
  const { padding, variant } = props

  if (padding !== undefined)
    return padding

  if (variant === 'unstyled')
    return '0em'

  if (!slots.default)
    return '1em'

  return '1.1em 1.2em'
})

const hasExplicitWidth = computed<boolean>(
  () => /w-/.test(attrs.class as string),
)
</script>

<template>
  <Component
    :is="button"
    :class="[
      {
        'active:brightness-[1.2]': !state.isDisabled && !state.isLoading,
        'opacity-50': state.isDisabled,
        'opacity-75': state.isLoading,
      },
    ]"
    :style="{
      backgroundColor,
      borderColor,
      color,
      outlineColor,
      padding: computedPadding,
      borderRadius: useBorderRadius(),
    }"
    class="border border-solid duration-200 outline-offset-[4px] relative text-sm"
  >
    <div
      v-if="state.isLoading && !hasExplicitWidth"
      class="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 top-1/2"
    >
      <AppLoader
        :accent-color="color"
        class="text-[1em]"
      />
    </div>

    <div
      :class="{
        'opacity-0': state.isLoading && !hasExplicitWidth,
      }"
      class="flex items-center justify-center relative"
    >
      <div class="relative">
        <Transition :name="!!iconLeft ? 'loader-with-icon-left' : 'loader'">
          <div
            v-if="state.isLoading && hasExplicitWidth"
            :style="{
              width: iconSize,
              marginRight: !!$slots.default ? iconSpacing : undefined,
            }"
            class="relative"
          >
            <AppLoader
              :accent-color="color"
              class="!absolute -translate-x-1/2 -translate-y-1/2 left-1/2 text-[0.9em] top-1/2"
            />
          </div>

          <div v-else-if="iconLeft">
            <AppIcon
              :icon="iconLeft"
              :secondary-color="backgroundColor"
              :style="{
                width: iconSize,
                marginRight: !!$slots.default ? iconSpacing : undefined,
              }"
            />
          </div>
        </Transition>
      </div>

      <span class="pointer-events-none text-[0.9375em] whitespace-nowrap">
        <slot />
      </span>

      <AppIcon
        v-if="iconRight"
        :icon="iconRight"
        :secondary-color="backgroundColor"
        :style="{
          width: iconSize,
          marginLeft: !!$slots.default ? iconSpacing : undefined,
        }"
      />
    </div>
  </Component>
</template>

<style lang="scss">
.loader {
  &-enter-active,
  &-leave-active {
    transition: 0.3s cubic-bezier(0.17, 0.67, 0.16, 0.99);
  }

  &-enter-from,
  &-leave-to {
    opacity: 0;
    width: 0 !important;
    margin-right: 0 !important;
  }
}

.loader-with-icon-left {
  &-enter-active,
  &-leave-active {
    transition: 0.3s cubic-bezier(0.17, 0.67, 0.16, 0.99);
  }

  &-leave-active {
    position: absolute;
    left: 0;
  }

  &-enter-from,
  &-leave-to {
    opacity: 0;
  }
}
</style>
