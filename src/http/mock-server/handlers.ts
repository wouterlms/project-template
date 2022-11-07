import { rest } from 'msw'

const { VITE_API_BASE_URL } = import.meta.env

const endpoint = (path: string): string => new URL(`/api${path}`, VITE_API_BASE_URL).toString()

export default [
  /**
   * Mock response example
   */
  rest.get(endpoint('/example/mock'), (req, res, { status, json }) => res(
    status(200),
    json({
      foo: 'bar',
    }),
  )),

  /**
   * Patch response example
   */
  rest.get(endpoint('/example/patch'), async (req, res, { status, json, fetch }) => {
    const originalResponse = await fetch(req)
    const originalResponseData = await originalResponse.json()

    return await res(
      status(originalResponse.status),
      json({
        ...originalResponseData,
        foo: 'bar',
      }),
    )
  }),
]
