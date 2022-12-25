import type { StyleValue } from 'vue'
import { useVModel } from '@wouterlms/composables'

import appTabsInjectionSymbol from './appTabsInjectionSymbol'

interface TabDimensions {
  left: number
  width: number
}

export interface Props {
  /**
   * @model
   */
  modelValue: unknown
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default () => {
  const props = useAttrs() as unknown as Props
  const value = useVModel(toRef(props, 'modelValue'))

  const tabs = ref<unknown[]>([])
  const tabDimensions = ref<TabDimensions[]>([])
  const transitionDuration = ref(0)

  let mutationObserver: MutationObserver | null = null

  // as soon as the first value is set, enable the transition
  watch(value, () => {
    transitionDuration.value = 400
  })

  const getEl = (): HTMLElement | null => document.querySelector('.tabs') ?? null

  const isTabSelected = (tab: unknown): boolean => (
    JSON.stringify(value.value) === JSON.stringify(tab)
  )

  const style = computed<StyleValue>(() => {
    if (tabDimensions.value.length === 0)
      return {}

    const tabIndex = tabs.value.findIndex((tab) => isTabSelected(tab))

    const { left, width } = tabDimensions.value[tabIndex]

    return {
      position: 'absolute',
      bottom: 0,
      left: 0,
      pointerEvents: 'none',
      transform: `translate3d(${left}px, 0, 0)`,
      width: `${width}px`,
      transition: `${transitionDuration.value}ms cubic-bezier(0.8, 0.5, 0.3, 1)`,
    }
  })

  const selectTab = (tab: unknown): void => {
    value.value = tab
  }

  const setTabDimensions = (): void => {
    const tabs = getEl()

    if (tabs == null)
      return

    Array.from(tabs.querySelectorAll('button'))
      .forEach((tab, i) => {
        tabDimensions.value[i] = {
          width: tab.clientWidth,
          left: tab.offsetLeft,
        }
      })
  }

  const createMutationObserver = (): void => {
    mutationObserver = new MutationObserver(() => {
      setTabDimensions()
    })

    mutationObserver.observe(getEl() as HTMLElement, {
      childList: true,
      subtree: true,
      attributes: true,
    })
  }

  const registerTab = (tab: unknown): void => {
    tabs.value.push(tab)
  }

  const unregisterTab = (tab: unknown): void => {
    const tabIndex = tabs.value.findIndex((s) => (
      JSON.stringify(s) === JSON.stringify(tab)
    ))

    tabs.value.splice(tabIndex, 1)
  }

  onMounted(() => {
    setTabDimensions()
    createMutationObserver()
  })

  onBeforeUnmount(() => {
    mutationObserver?.disconnect()
  })

  provide(appTabsInjectionSymbol, {
    selectedTab: readonly(value),
    registerTab,
    unregisterTab,
    selectTab,
  })

  const tabsComponent = h('div', {
    class: 'relative tabs',
  })

  return {
    tabs: tabsComponent,
    state: computed(() => ({
      style: style.value,
    })),
  }
}
