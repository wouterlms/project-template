import type { RouteRecordRaw } from 'vue-router'
import TestWrapper from '../TestWrapper.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '',
    component: h(TestWrapper),
    children: [
      {
        path: '',
        redirect: '/a',
      },
      {
        path: 'a',
        component: async () => await import('../TestA.vue'),
      },
      {
        path: 'b',
        component: async () => await import('../TestB.vue'),
      },
    ],
  },
]

export default routes
