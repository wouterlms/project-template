import { useVModel } from '@wouterlms/composables'

import { usePropsWithDefaults } from '@/composables/ui'

export interface Props {
  /**
   * @model
   */
  modelValue: unknown

  /**
   * Checkbox value
   */
  value: unknown

  /**
   * Disable checkbox
   */
  isDisabled?: boolean

  /**
   * Readonly checkbox
   */
  isReadonly?: boolean
}

const defaultProps = {
  isDisabled: false,
  isReadonly: false,
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default () => {
  const props = usePropsWithDefaults(defaultProps, useAttrs() as unknown as Props)

  const checkboxValue = useVModel(toRef(useAttrs(), 'modelValue'))

  const isFocused = ref(false)

  const isChecked = computed<boolean>({
    get() {
      if (Array.isArray(checkboxValue.value)) {
        return checkboxValue.value.map(
          (v) => JSON.stringify(v),
        ).includes(JSON.stringify(props.value.value))
      }
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      return !!checkboxValue.value
    },
    set(checked: unknown) {
      if (props.value.isReadonly)
        return

      if (Array.isArray(checkboxValue.value)) {
        const index = checkboxValue.value.findIndex((entry) => JSON.stringify(entry)
        === JSON.stringify(props.value.value))

        if (index === -1)
          checkboxValue.value.push(props.value.value)
        else
          checkboxValue.value.splice(index, 1)
      }
      else {
        checkboxValue.value = checked
      }
    },
  })

  const toggle = (): void => {
    isChecked.value = !isChecked.value
  }

  const checkbox = computed(() => {
    const {
      isDisabled,
      isReadonly,
    } = props.value

    return h('button', {
      type: 'button',
      role: 'checkbox',
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
      onClick: toggle,
      onKeydown: (e: KeyboardEvent) => {
        const { code } = e

        if (code === 'Space') {
          toggle()
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
    checkbox,
    state: computed(() => ({
      isChecked: isChecked.value,
      isFocused: isFocused.value,
      isDisabled: props.value.isDisabled,
    })),
  }
}
