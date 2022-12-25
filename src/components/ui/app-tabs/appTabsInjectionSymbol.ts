import type { InjectionKey, Ref } from 'vue'

export default Symbol('appTabs') as InjectionKey<{
  selectedTab: Readonly<Ref<unknown | null>>
  selectTab: (tab: unknown) => void
  registerTab: (tab: unknown) => void
  unregisterTab: (tab: unknown) => void
}>
