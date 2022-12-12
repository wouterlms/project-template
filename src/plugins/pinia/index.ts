import { createPinia } from 'pinia'
import logger from './piniaLogger'

const pinia = createPinia()
  .use(logger({
    isEnabled: true,
  }))

export default pinia
