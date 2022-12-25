import { ref } from 'vue'

interface Toast {
  id: string
  message: string
}

const toasts = ref<Toast[]>([])
const toast = computed(() => toasts.value[0] ?? null)

let timeout: ReturnType<typeof setTimeout> | null = null

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default () => {
  const setRemoveToastTimeout = (): void => {
    timeout = setTimeout(() => {
      toasts.value.shift()
      timeout = null

      if (toasts.value.length > 0)
        setRemoveToastTimeout()
    }, 5000)
  }

  const showToastMessage = (message: string): void => {
    toasts.value.push({
      id: Math.random().toString(36),
      message,
    })

    if (timeout === null)
      setRemoveToastTimeout()
  }

  return {
    toast,
    showToastMessage,
  }
}
