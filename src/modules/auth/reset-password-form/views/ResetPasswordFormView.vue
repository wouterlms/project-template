<script setup lang="ts">
import { FormElement, useForm } from '@wouterlms/forms'

import {
  AppButton,
  FormInput,
  FormLabel,
  colors,
  useToasts,
} from '@wouterlms/ui'

import { useResetPasswordFormService, useResetPasswordFormState } from '../composables'

import { useResetPasswordStore } from '@/stores'
import { useAuth } from '@/composables'

import { Route } from '@/routes'
import { Icon } from '@/icons'

const { t } = useI18n()
const { replace } = useRouter()
const { query: { token, email } } = useRoute()
const { signIn } = useAuth()
const { createToast, removeToast } = useToasts()
const { hasResetPassword } = useResetPasswordStore()

const formState = useResetPasswordFormState()

const {
  handlePrepare,
  handleSubmit,
} = useResetPasswordFormService(formState)

const form = useForm(formState, {
  handlePrepare,
  handleSubmit,
})

const { formObject } = formState

const loginWithNewCredentials = async (): Promise<void> => {
  const { email, password } = formState.getData()
  await signIn(email, password)
}

if (token === undefined || email === undefined) {
  const toast = createToast({
    title: t('auth.reset_password_form.invalid_link'),
    message: t('auth.reset_password_form.this_is_not_a_valid'),
    icon: Icon.OBJECT_AND_TOOLS_LINK,
    accentColor: colors.value.accent.error,
    action: {
      label: 'Request new link',
      onClick: async () => {
        await replace({ name: Route.FORGOT_PASSWORD })
        removeToast(toast)
      },
    },
  })
}
</script>

<template>
  <AuthPage
    :title="t('common.reset_password')"
    :description="hasResetPassword
      ? t('auth.reset_password_form.your_password_has_been_reset')
      : t('auth.reset_password_form.enter_your_new_password')"
  >
    <div v-if="hasResetPassword">
      <AppButton
        class="w-full"
        @click="loginWithNewCredentials"
      >
        {{ t('common.sign_in') }}
      </AppButton>
    </div>

    <FormElement
      v-else
      :form="form"
    >
      <FormSpacer>
        <FormLabel
          :label="t('common.password')"
          :error="formObject.password.error ?? formObject.email.error"
        >
          <FormInput
            v-model="formObject.password.value"
            :error="!!formObject.password.error || !!formObject.email.error"
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
