
import type { VNode } from 'vue'
import SuspenseWrapper from '@/components/suspense/SuspenseWrapper.vue'

// ? component: async () => await wrapWithSuspense(import('@/PathToFile.vue')),

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async (component: Promise<any>): Promise<VNode> => {
  const { default: resolvedComponent } = await component

  return (
    h(SuspenseWrapper, {
      component: resolvedComponent,
    })
  )
}
