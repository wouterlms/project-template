<script setup lang="ts">
import { FormElement, useForm } from '@wouterlms/forms'

import { useResetPasswordFormService, useResetPasswordFormState } from '../composables'

import { useToasts } from '@/composables'

const { t } = useI18n()
const { showToastMessage } = useToasts()
const route = useRoute()

const { token } = route.params
const { email } = route.query

const formState = useResetPasswordFormState()

const { handleSubmit } = useResetPasswordFormService(formState)

const form = useForm(formState, {
  handleSubmit,
})

const { state } = formState

if (token == null || email == null)
  showToastMessage(t('auth.reset_password_form.this_is_not_a_valid'))
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
            :has-error="!!state.password.error || !!state.email.error"
            type="password"
          />
        </FormLabel>
      </FormSpacer>

      <FormButton
        :form="form"
        class="mt-6"
      >
        {{ t('common.reset_password') }}
      </FormButton>
    </FormElement>
  </AuthPage>
</template>
