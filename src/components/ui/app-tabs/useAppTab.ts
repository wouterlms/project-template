import appTabsInjectionSymbol from './appTabsInjectionSymbol'

export interface Props {
  /**
   * Tab value
   */
  value: unknown
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default () => {
  const props = useAttrs() as unknown as Props

  const {
    selectedTab,
    selectTab,
    registerTab,
    unregisterTab,

  } = inject(appTabsInjectionSymbol)!

  registerTab(props.value)

  onBeforeUnmount(() => {
    unregisterTab(props.value)
  })

  const isSelected = computed(
    () => selectedTab.value !== null
      && JSON.stringify(selectedTab.value) === JSON.stringify(props.value),
  )

  const tab = computed(() => h('button', {
    type: 'button',
    onClick: () => selectTab(props.value),
  }))

  return {
    tab,
    state: computed(() => ({
      isSelected: isSelected.value,
    })),
  }
}
