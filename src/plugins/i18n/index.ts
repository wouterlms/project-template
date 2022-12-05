import { createI18n } from 'vue-i18n'

import en from './locales/en.json'

enum Locale {
  EN = 'en-US',
}

const messages = {
  [Locale.EN]: en,
}

const defaultLocale = Locale.EN

export default createI18n({
  messages,
  legacy: false,
  fallbackLocale: defaultLocale,
  locale: defaultLocale,
})
