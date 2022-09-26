import type { RouteRecordRaw } from 'vue-router'

import AuthLayout from '../components/AuthLayout.vue'
import { guest } from '@/middleware'

const routes: RouteRecordRaw[] = [
  {
    path: '',
    component: AuthLayout,
    meta: {
      middleware: [guest],
    },
    children: [
      {
        path: 'login',
        name: 'login',
        component: async () => await import('../login-form/views/LoginFormView.vue'),
      },
      {
        path: 'forgot-password',
        name: 'forgot-password',
        component: async () => await import('../forgot-password-form/views/ForgotPasswordFormView.vue'),
      },
      {
        path: 'reset-password/:token',
        name: 'reset-password',
        component: async () => await import('../reset-password-form/views/ResetPasswordFormView.vue'),
      },
    ],
  },
]

export default routes
