import baseColors from './colors'

import { useDarkMode } from '@/composables/ui'

const { isDark, detectTheme } = useDarkMode()

detectTheme()

export const colors = computed<{
  [K in keyof typeof baseColors]: {
    [P in keyof typeof baseColors[K]]: typeof baseColors[K][P] extends string
      ? string
      : typeof baseColors[K][P] extends string[]
        ? string
        : {
            [Q in keyof typeof baseColors[K][P]]: string
          }
  }
}>(() => Object.entries(baseColors).reduce<any>((acc, [colorGroupName, colorGroup]) => {
  const index = isDark.value ? 1 : 0

  acc[colorGroupName] = {}

  for (const colorKey in colorGroup) {
    const color = (colorGroup as any)[colorKey]
    const activeColor = Array.isArray(color) ? color[index] : color

    acc[colorGroupName][colorKey] = activeColor
  }

  return acc
}, {}))
