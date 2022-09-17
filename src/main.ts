import { createApp } from 'vue'

import App from '@/App.vue'

import router from '@/router'
import createAxiosInstance from '@/http'
import i18n from '@/i18n'

import '@/assets/styles/tw.scss'
import '@wouterlms/ui/style.css'

const app =
  createApp(App)
    .use(router)
    .use(i18n)

createAxiosInstance()

app.mount('#app')
