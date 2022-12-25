/* eslint-disable no-console */
import type { PiniaPluginContext } from 'pinia'
import { useDarkMode } from '@/composables/ui'

interface Options {
  isEnabled: boolean
}

const { VITE_IS_LOCAL } = import.meta.env

export default (
  { isEnabled }: Options = { isEnabled: true },
) => (ctx: PiniaPluginContext): void => {
  ctx.store.$onAction((action) => {
    if (!isEnabled || !VITE_IS_LOCAL)
      return

    const { name, args, store } = action

    const now = new Date()
    const timestamp = now.toLocaleTimeString('nl-BE')
    const { isDark } = useDarkMode()

    console.groupCollapsed(
      `%c[%c${store.$id}Store.%c${name}] - %c${timestamp}`,
      'font-weight: bold;',
      `color: ${isDark.value ? '#c7cfd7' : '#3f3f3f'};`,
      `color: ${isDark.value ? '#d2a8ff' : '#8d41c9'};`,
      'font-weight: normal;',
    )
    console.log(args[0])
    console.groupEnd()
  })
}
