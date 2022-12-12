import type { RouteLocation } from 'vue-router'

export default interface Breadcrumb {
  label: string
  to?: RouteLocation | any
}
