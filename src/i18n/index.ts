import { createI18n } from 'vue-i18n'

import nl from './locales/nl.json'

export enum Locale {
  NL = 'nl-BE',
}

const messages = {
  [Locale.NL]: nl,
}

const defaultLocale = Locale.NL

export default createI18n({
  messages,
  legacy: false,
  fallbackLocale: defaultLocale,
  locale: defaultLocale,
})
