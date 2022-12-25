import { useVModel } from '@wouterlms/composables'
import { usePropsWithDefaults } from '@/composables/ui'

export interface Props {
  /**
   * @model
   */
  modelValue: unknown

  /**
   * Radio value
   */
  value: unknown

  /**
   * Disable radio input
   */
  isDisabled?: boolean

  /**
   * Readonly input
   */
  isReadonly?: boolean
}

const defaultProps = {
  isDisabled: false,
  isReadonly: false,
  rounded: 'sm',
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default () => {
  const props = usePropsWithDefaults(defaultProps, useAttrs() as unknown as Props)

  const radioValue = useVModel(toRef(useAttrs(), 'modelValue'))
  const isFocused = ref(false)
  const isChecked = computed(() => (
    JSON.stringify(radioValue.value) === JSON.stringify(props.value.value)
  ))

  const select = (): void => {
    if (!props.value.isReadonly)
      radioValue.value = props.value.value
  }

  const radio = computed(() => {
    const {
      isDisabled,
      isReadonly,
    } = props.value

    return h('button', {
      type: 'button',
      role: 'radio',
      disabled: isDisabled,
      readonly: isReadonly,
      ariaChecked: isChecked,
      ariaDisabled: isDisabled,
      class: [
        {
          'cursor-not-allowed': isDisabled,
          'cursor-default': isReadonly,
        },
      ],
      onClick: select,
      onKeydown: (e: KeyboardEvent) => {
        const { code } = e

        if (code === 'Space') {
          select()
          e.preventDefault()
        }
      },
      onFocus: () => {
        isFocused.value = true
      },
      onBlur: () => {
        isFocused.value = false
      },
    })
  })

  return {
    radio,
    state: computed(() => ({
      isChecked: isChecked.value,
      isFocused: isFocused.value,
      isDisabled: props.value.isDisabled,
    })),
  }
}
