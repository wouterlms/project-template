<script setup lang="ts">
import { FormElement, useForm } from '@wouterlms/forms2'

import {
  FormInput,
  FormLabel,
  colors,
  useToasts,
} from '@wouterlms/ui'

import { Icon } from '@wouterlms/icons'

import { useResetPasswordFormService, useResetPasswordFormState } from '../composables'

import { Route } from '@/routes'

const { t } = useI18n()
const router = useRouter()
const { query: { token, email } } = useRoute()
const { createToast, removeToast } = useToasts()

const formState = useResetPasswordFormState()

const {
  handlePrepare,
  handleSubmit,
} = useResetPasswordFormService(formState)

const form = useForm(formState, {
  handlePrepare,
  handleSubmit,
})

const { state } = formState

if (token === undefined || email === undefined) {
  const toast = createToast({
    title: t('auth.reset_password_form.invalid_link'),
    message: t('auth.reset_password_form.this_is_not_a_valid'),
    icon: Icon.OBJECT_AND_TOOLS_LINK,
    accentColor: colors.value.accent.error,
    action: {
      label: t('auth.reset_password_form.request_new_reset_link'),
      onClick: async () => {
        await router.replace({ name: Route.FORGOT_PASSWORD })
        removeToast(toast)
      },
    },
  })
}
</script>

<template>
  <AuthPage
    :title="t('common.reset_password')"
    :description="t('auth.reset_password_form.enter_your_new_password')"
  >
    <FormElement :form="form">
      <FormSpacer>
        <FormLabel
          :label="t('common.password')"
          :error="state.password.error ?? state.email.error"
        >
          <FormInput
            v-model="state.password.value"
            :error="!!state.password.error || !!state.email.error"
            type="password"
          />
        </FormLabel>

        <FormButton :form="form">
          {{ t('common.reset_password') }}
        </FormButton>
      </FormSpacer>
    </FormElement>
  </AuthPage>
</template>
