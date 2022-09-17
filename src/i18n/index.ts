import { createI18n } from 'vue-i18n'

import en from './locales/en.json'
import nl from './locales/nl.json'

export enum Locale {
  EN = 'en-US',
  NL = 'nl-BE'
}

const messages = {
  [Locale.EN]: en,
  [Locale.NL]: nl,
}

const defaultLocale = Locale.NL

export default createI18n({
  messages,
  legacy: false,
  fallbackLocale: defaultLocale,
  locale: defaultLocale,
})
