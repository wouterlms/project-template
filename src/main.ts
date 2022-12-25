import { createApp } from 'vue'

import App from '@/App.vue'
import router from '@/router'

import {
  createAxiosInstance,
  i18n,
  pinia,
} from '@/plugins'

import '@/assets/styles/style.scss'
import '@wouterlms/ui/style.css'

const app = createApp(App)
  .use(pinia)
  .use(router)
  .use(i18n)

// initSentry(app, router)

createAxiosInstance()
// await createMockServer()

app.mount('#app')
