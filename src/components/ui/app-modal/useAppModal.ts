import type { Ref } from 'vue'

import {
  useEventListener,
  useVModel,
} from '@wouterlms/composables'

import AppModalWrapper from './AppModalWrapper.vue'
import { usePropsWithDefaults } from '@/composables/ui'

export interface Props {
  /**
   * @modal
   * Show modal
   */
  show: boolean

  /**
    * Close modal when `escape` key is pressed
    */
  closeOnEscape?: boolean

  /**
    * Trap focus
    */
  trapFocus?: boolean
}

const defaultProps = {
  closeOnEscape: true,
  trapFocus: true,
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default () => {
  const props = usePropsWithDefaults(defaultProps, useAttrs() as unknown as Props)

  const showModal = useVModel<boolean>(toRef(useAttrs(), 'show') as Ref<boolean>, 'show')

  const close = (): void => {
    showModal.value = false
  }

  watch(
    showModal,
    (show) => {
      document.body.style.overflow = show ? 'hidden' : 'auto'
    },
    { immediate: true },
  )

  if (props.value.closeOnEscape) {
    useEventListener('keydown', (e: KeyboardEvent) => {
      if (e.code === 'Escape' && showModal.value) {
        e.preventDefault()
        showModal.value = false
      }
    })
  }

  onBeforeUnmount(() => (
    document.body.style.overflow = 'auto'
  ))

  const modalWrapper = computed(() => h(AppModalWrapper, {
    isActive: showModal.value && props.value.trapFocus,
  }))

  return {
    modalWrapper,
    close,
    state: computed(() => ({
      isVisible: showModal.value,
    })),
  }
}
