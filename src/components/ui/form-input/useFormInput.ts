import { useVModel } from '@wouterlms/composables'
import { usePropsWithDefaults } from '@/composables/ui'

enum ComponentType {
  INPUT = 'input',
  TEXTAREA = 'textarea',
}

export interface Props {
  /**
   * @model
   */
  modelValue: string | number | null

  /**
   * Readonly input
   */
  isReadonly?: boolean

  /**
   * Disable input
   */
  isDisabled?: boolean

  /**
   * When `true` it will disable the input
   */
  isLoading?: boolean

  /**
   * Native spellcheck, defaults to false
   */
  spellcheck?: boolean

  /**
   * Autofocus input on mount
   */
  autofocus?: boolean

  /**
   * Native input types + `textarea`
   */
  type?: 'text' | 'number' | 'password' | 'email' | 'date' | 'time' | 'textarea'

  /**
   * Textarea height
   */
  textareaHeight?: string
}

const defaultProps = {
  isReadonly: false,
  isDisabled: false,
  isLoading: false,
  spellcheck: false,
  autofocus: false,
  type: 'text',
  placeholder: undefined,
  textareaHeight: '6em',
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default () => {
  const props = usePropsWithDefaults(defaultProps, useAttrs() as unknown as Props)

  const value = useVModel(toRef(props.value, 'modelValue'))
  const isPasswordVisible = ref(false)
  const isFocused = ref(false)

  const component = computed(() => {
    if (props.value.type === ComponentType.TEXTAREA)
      return ComponentType.TEXTAREA

    return ComponentType.INPUT
  })

  const inputType = computed(() => {
    if (props.value.type === 'password')
      return isPasswordVisible.value ? 'text' : 'password'

    return props.value.type
  })

  const togglePassword = (): void => {
    isPasswordVisible.value = !isPasswordVisible.value
  }

  const clearInputValue = (): void => {
    value.value = null
  }

  const input = computed(() => {
    const {
      autofocus,
      type,
      isDisabled,
      isReadonly,
      spellcheck,
      textareaHeight,
    } = props.value

    return h(component.value, {
      value: props.value.modelValue,
      spellcheck,
      type: inputType.value,
      disabled: isDisabled,
      readonly: isReadonly,
      class: [
        'bg-transparent',
        {
          'cursor-not-allowed': isDisabled,
          'cursor-default': isReadonly,
        },
      ],
      style: {
        height: type === 'textarea' ? textareaHeight : undefined,
      },
      onInput: (e: InputEvent) => {
        const element = e.currentTarget as HTMLInputElement
        value.value = element.value
      },
      onFocus: () => {
        isFocused.value = true
      },
      onBlur: () => {
        isFocused.value = false
      },
      onVnodeMounted: ({ el }) => {
        if (autofocus) {
          setTimeout(() => {
            el?.focus()
          }, 0)
        }
      },
    })
  })

  return {
    input,
    togglePassword,
    clearInputValue,
    state: computed(() => ({
      isPasswordVisible: isPasswordVisible.value,
      isFocused: isFocused.value,
      isDisabled: props.value.isDisabled,
      isLoading: props.value.isLoading,
      isReadonly: props.value.isReadonly,
      type: props.value.type,
    })),
  }
}
