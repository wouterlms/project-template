import type { InjectionKey } from 'vue'

export default <T>(injectionKey: InjectionKey<T>): NonNullable<T> => {
  const data = inject<T>(injectionKey) ?? null

  if (data === null) throw Error(`Injection key ${injectionKey.description as string} is not provided`)

  return data
}
