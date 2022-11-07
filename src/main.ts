import { createApp } from 'vue'

import App from '@/App.vue'
import router from '@/router'
import i18n from '@/i18n'

import { createAxiosInstance } from '@/http'
import { startMockServerOnDev } from '@/http/mock-server'
// import initSentry from '@/sentry'

import '@/assets/styles/tw.scss'
import '@wouterlms/ui/style.css'

const app = createApp(App)
  .use(router)
  .use(i18n)

// initSentry(app, router)

createAxiosInstance()
await startMockServerOnDev()

app.mount('#app')
