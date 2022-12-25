import type { VNode } from 'vue'

import type { RouteLocationRaw } from 'vue-router'
import { RouterLink } from 'vue-router'

import { usePropsWithDefaults } from '@/composables/ui'

export interface Props {
  /**
   * Renders a `<RouterLink>`
   */
  to?: RouteLocationRaw

  /**
   * Renders a `<a>`
   */
  href?: string

  /**
   * Native button type, defaults to `button`
   */
  type?: string

  /**
   * Disable button
   */
  isDisabled?: boolean

  /**
   * Show loader and disable button
   */
  isLoading?: boolean
}

const defaultProps = {
  type: 'button',
  isDisabled: false,
  isLoading: false,
  to: undefined,
  href: undefined,
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default () => {
  const props = usePropsWithDefaults(defaultProps, useAttrs() as Props)

  const component = computed<typeof RouterLink | string>(() => {
    if (props.value.to !== undefined)
      return RouterLink

    if (props.value.href !== undefined)
      return 'a'

    return 'button'
  })

  const button = computed(() => {
    const {
      isLoading,
      isDisabled,
      type,
      to,
      href,
    } = props.value

    const buttonProps: Record<string, unknown> = {
      to,
      type: to == null && href == null ? type : undefined,
      disabled: isLoading || isDisabled,
      class: [
        'inline-block',
        isDisabled || isLoading
          ? 'cursor-not-allowed'
          : 'cursor-pointer',
      ],
    }

    if (href !== undefined)
      buttonProps.href = href

    return h(component.value as string | VNode, buttonProps)
  })

  return {
    button,
    state: computed(() => ({
      isLoading: props.value.isLoading,
      isDisabled: props.value.isDisabled,
    })),
  }
}
