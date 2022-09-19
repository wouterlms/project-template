import axios from 'axios'

import type { AxiosResponse } from 'axios'

import { setupCache } from 'axios-cache-adapter'

const { VITE_API_BASE_URL } = import.meta.env

const toCamelCase = (str: string): string => (
  str.replace(/[_.-](\w|$)/g, (_, x) => x.toUpperCase())
)

const toSnakeCase = (str: string): string => (
  str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`)
)

const convert = (obj: unknown, handler: (str: string) => string): unknown => {
  if (
    obj === null ||
    typeof obj !== 'object' ||
    obj instanceof Date ||
    obj instanceof RegExp
  ) return obj

  if (Array.isArray(obj)) return obj.map(o => convert(o, handler))

  return Object.keys(obj).reduce<Record<string, unknown>>((res, key) => {
    const newKey = handler(key)
    // eslint-disable-next-line no-param-reassign
    res[newKey] = convert((obj as Record<string, unknown>)[key], handler)

    return res
  }, {})
}

export default (): void => {
  /**
   * Cache setup
   */
  const cache = setupCache({
    store: {
      getItem: (key: string) => {
        const item = sessionStorage.getItem(key) ?? null

        if (item !== null) return JSON.parse(item)

        return null
      },
      setItem: (key: string, response: AxiosResponse) => {
        sessionStorage.setItem(key, JSON.stringify(response))
      },
      removeItem: (key: string) => {
        sessionStorage.removeItem(key)
      },
    },
  })

  axios.defaults.adapter = cache.adapter

  /**
   * Defaults
   */
  axios.defaults.baseURL = `${VITE_API_BASE_URL as string}/api`
  axios.defaults.headers.common['Accept-Language'] = navigator.language

  /**
   * Request interceptor to convert camelCase to snake_case
   */
  axios.interceptors.request.use(
    (response) => ({
      ...response,
      data: convert(response.data, toSnakeCase),
    })
  )

  /**
   * Response interceptor to convert snake_case to camelCase
   */
  axios.interceptors.response.use(
    (response) => ({
      ...response,
      data: convert(response.data, toCamelCase),
    })
  )

  if (import.meta.env.DEV) {
    const [
      project,
      environment
    ] = VITE_API_BASE_URL.split('.')

    // eslint-disable-next-line no-console
    console.log(`Api environment: ${project.replace('https://', '') as string}.${environment as string}`)

    // eslint-disable-next-line no-console
    if (environment === 'production') console.warn('You\'re using the production environment api')
  }
}
