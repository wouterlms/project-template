import type { Ref } from 'vue'
import { useTimeout } from '@wouterlms/composables'

type UsePageLoader = () => {
  showProgressBar: Ref<boolean>
  progress: Ref<number>
}

const usePageLoader: UsePageLoader = () => {
  const router = useRouter()

  const showProgressBar = ref(false)
  const progress = ref(0)

  // Timeout is used to not show a loader when a page has already been loaded
  let startLoadingTimeout: ReturnType<typeof setTimeout> | null = null
  let raf: ReturnType<typeof requestAnimationFrame> | null = null

  const {
    start: startShowProgressBarTimeout,
    stop: stopShowProgressBarTimeout,
  } = useTimeout(() => {
    showProgressBar.value = false
  }, 400, { immediate: false })

  const increase = (): void => {
    progress.value += progress.value < 40 ? 2 : 0.1
    raf = requestAnimationFrame(increase)
  }

  const startLoading = (): void => {
    stopShowProgressBarTimeout()

    startLoadingTimeout = setTimeout(() => {
      showProgressBar.value = true
      progress.value = 0

      raf = requestAnimationFrame(increase)
    }, 100)
  }

  const finishLoading = (): void => {
    if (startLoadingTimeout !== null)
      clearTimeout(startLoadingTimeout)

    if (raf !== null)
      cancelAnimationFrame(raf)

    startShowProgressBarTimeout()

    progress.value = 100
  }

  router.beforeEach(startLoading)
  router.afterEach(finishLoading)

  return {
    showProgressBar,
    progress,
  }
}

export default usePageLoader
