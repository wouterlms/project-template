<script setup lang="ts">
import { useForm, FormElement } from '@wouterlms/forms'

import {
  FormLabel,
  FormInput,
  AppButton
} from '@wouterlms/ui'

import { useResetPasswordFormService, useResetPasswordFormState } from '../composables'

import { useResetPasswordStore, useAuthStore } from '@/stores'

const { t } = useI18n()
const { login } = useAuthStore()
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
  await login(email, password)
}
</script>

<template>
  <AuthPage
    :title="t('auth.reset_password.title')"
    :description="hasResetPassword
      ? t('auth.reset_password.success_message')
      : t('auth.reset_password.description')"
  >
    <div v-if="hasResetPassword">
      <AppButton
        class="w-full"
        @click="loginWithNewCredentials"
      >
        {{ t('auth.login.action') }}
      </AppButton>
    </div>

    <FormElement
      v-else
      :form="form"
    >
      <FormSpacer>
        <FormLabel
          :label="t('form.password')"
          :error="formObject.password.error ?? formObject.email.error"
        >
          <FormInput
            v-model="formObject.password.value"
            :error="!!formObject.password.error || !!formObject.email.error"
            type="password"
          />
        </FormLabel>

        <FormButton :form="form">
          {{ t('auth.reset_password.action') }}
        </FormButton>
      </FormSpacer>
    </FormElement>
  </AuthPage>
</template>
