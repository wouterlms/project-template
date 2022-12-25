import type { ComputedRef } from 'vue'
import { computed } from 'vue'

export default <O, T extends Record<any, any>>(defaultProps: O, props: T): ComputedRef<O & T> => {
  const toCamelCase = (s: string): string => s.replace(/-./g, (x) => x[1].toUpperCase())

  const camelizeObject = <T extends Record<any, any>>(obj: T): T => {
    const o: Record<string, unknown> = {}

    Object.entries(obj).forEach(([k, v]) => {
      o[toCamelCase(k)] = v
    })

    return o as T
  }

  const propsWithDefaults = computed(() => ({
    ...defaultProps,
    ...camelizeObject<T>(props),
  }))

  return propsWithDefaults
}
