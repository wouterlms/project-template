import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from '@/App.vue'
import router from '@/router'
import i18n from '@/i18n'

import { createAxiosInstance } from '@/http'
import { startMockServerOnDev } from '@/http/mock-server'
// import initSentry from '@/sentry'

import '@/assets/styles/tw.scss'
import '@wouterlms/ui/style.css'

const pinia = createPinia()

const app = createApp(App)
  .use(pinia)
  .use(router)
  .use(i18n)

// initSentry(app, router)

createAxiosInstance()
await startMockServerOnDev()

app.mount('#app')
