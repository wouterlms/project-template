import axios, { AxiosError } from 'axios'

export default (): void => {
  const { VITE_API_BASE_URL, DEV } = import.meta.env

  const toCamelCase = (str: string): string => (
    str.replace(/[_.-](\w|$)/g, (_, x) => x.toUpperCase())
  )

  const toSnakeCase = (str: string): string => (
    str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`)
  )

  const convert = (obj: unknown, handler: (str: string) => string): unknown => {
    if (
      obj === null
    || typeof obj !== 'object'
    || obj instanceof Date
    || obj instanceof RegExp
    ) return obj

    if (Array.isArray(obj))
      return obj.map((o) => convert(o, handler))

    return Object.keys(obj).reduce<Record<string, unknown>>((res, key) => {
      const newKey = handler(key)

      res[newKey] = convert((obj as Record<string, unknown>)[key], handler)

      return res
    }, {})
  }

  const log = ({ request, response }: AxiosError): void => {
    if (response === undefined)
      return

    const { status, config: { url, method } } = response

    const timestamp = new Date().toLocaleTimeString('nl-BE')

    if (method === undefined || url === undefined)
      return

    /* eslint-disable no-console */
    console.groupCollapsed(
      `%c[API] ${timestamp} ${method.toUpperCase()} %c${url} %c(${status})`,
      'font-weight: bold;',
      'font-weight: bold; color: #5f6367;',
      'color: #e95f5d; font-weight: bold;',
    )
    console.log('Request', request)
    console.log('Response', response)
    console.groupEnd()
    /* eslint-enable no-console */

    if (DEV) {
      const environment = response.config.baseURL?.match(/development|staging|production/)?.[0] ?? 'unknown'

      try {
        const readableError = `\`${method.toUpperCase()} ${url} (${status})\`

Environment: *${environment}*

${method === 'post' || method === 'put' ? `*Payload*\n\`\`\`${JSON.stringify(JSON.parse(response.config.data), null, 2)}\`\`\`` : ''}

*Response body*
\`\`\`${JSON.stringify(response.data, null, 2)}\`\`\`

`

        void navigator.clipboard.writeText(readableError)
      }
      catch {}
    }
  }

  /**
   * Defaults
   */
  axios.defaults.baseURL = `${VITE_API_BASE_URL}/api`
  axios.defaults.headers.common['Accept-Language'] = navigator.language

  /**
   * Logger
   */
  axios.interceptors.response.use(
    (res) => res,
    async (err) => {
      if (err instanceof AxiosError)
        log(err)

      return await Promise.reject(err)
    },
  )

  /**
   * Request interceptor to convert camelCase to snake_case
   */
  axios.interceptors.request.use(
    ({ data, ...request }) => {
      if (data instanceof FormData) {
        return {
          ...request,
          data,
        }
      }

      const isOAuth = request.url?.split('/')[1] === 'oauth'

      return {
        ...request,
        data: isOAuth ? data : convert(data, toSnakeCase),
      }
    },
  )

  /**
   * Response interceptor to convert snake_case to camelCase
   */
  axios.interceptors.response.use(
    ({ data, ...response }) => {
      const isOAuth = response.config.url?.split('/')[1] === 'oauth'

      return {
        ...response,
        data: isOAuth ? data : convert(data, toCamelCase),
      }
    },
  )

  if (import.meta.env.DEV && !VITE_API_BASE_URL.includes('localhost')) {
    const environment = VITE_API_BASE_URL.match(/development|staging|production/)?.[0] ?? null

    if (environment === 'production')
      console.warn('You\'re using the production environment api')
  }
}
