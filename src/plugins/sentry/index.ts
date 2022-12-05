import type { App } from 'vue'
import type { Router } from 'vue-router'

import { init, vueRouterInstrumentation } from '@sentry/vue'
import { BrowserTracing } from '@sentry/tracing'

export default (app: App<Element>, router: Router): void => {
  const { VITE_SENTRY_DSN, VITE_SENTRY_TRACING_ORIGIN } = import.meta.env

  if (VITE_SENTRY_DSN === undefined || VITE_SENTRY_TRACING_ORIGIN === undefined)
    throw new Error('Sentry DSN or Tracing Origin is not defined. Make sure to define `VITE_SENTRY_DSN` and `VITE_SENTRY_TRACING_ORIGIN` in your .env file.')

  init({
    app,
    dsn: VITE_SENTRY_DSN,
    integrations: [
      new BrowserTracing({
        routingInstrumentation: vueRouterInstrumentation(router),
        tracingOrigins: [VITE_SENTRY_TRACING_ORIGIN, /^\//],
      }),
    ],
    tracesSampleRate: 1.0,
  })
}
