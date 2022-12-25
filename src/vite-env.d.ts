/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

interface ImportMetaEnv {
  readonly VITE_IS_LOCAL: boolean
  readonly VITE_API_BASE_URL: string
  readonly VITE_CLIENT_ID: string
  readonly VITE_CLIENT_SECRET: string
  readonly VITE_SENTRY_DSN: string
  readonly VITE_SENTRY_TRACING_ORIGIN: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}