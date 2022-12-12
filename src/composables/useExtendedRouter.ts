import type { NavigationFailure, Router } from 'vue-router'

import type { NamedRoute } from '@/types'

interface ExtendedRouter extends Omit<Router, 'push'> {
  // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
  push: (route: NamedRoute | string) => Promise<void | NavigationFailure | undefined>
  // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
  replace: (route: NamedRoute | string) => Promise<void | NavigationFailure | undefined>
}

export default (): ExtendedRouter => {
  const router = useRouter()

  const push = async (
    route: NamedRoute | string,
    // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
  ): Promise<void | NavigationFailure | undefined> => await router.push(route)

  const replace = async (
    route: NamedRoute | string,
    // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
  ): Promise<void | NavigationFailure | undefined> => await router.replace(route)

  return {
    ...router,
    push,
    replace,
  }
}
