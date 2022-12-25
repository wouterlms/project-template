<script setup lang="ts">
import { FormElement, useForm } from '@wouterlms/forms'

import { useForgotPasswordFormService, useForgotPasswordFormState } from '../composables'
import { useForgotPasswordStore } from '@/stores'

import { Route } from '@/enums'

const { t } = useI18n()

const forgotPasswordStore = useForgotPasswordStore()
const formState = useForgotPasswordFormState()

const { handleSubmit } = useForgotPasswordFormService(formState)

const form = useForm(formState, {
  allowPristineSubmit: true,
  handleSubmit,
})

const { state } = formState

onBeforeUnmount(() => {
  forgotPasswordStore.setHasSentEmail(false)
})

const hasSentEmail = computed(() => forgotPasswordStore.hasSentEmail)
</script>

<template>
  <AuthPage
    :title="t('auth.forgot_password_form.forgot_password')"
    :description="hasSentEmail
      ? t('auth.forgot_password_form.thank_you_within_a_few')
      : t('auth.forgot_password_form.dont_remember_your_password_enter')"
  >
    <AppButton
      v-if="hasSentEmail"
      :to="{
        name: Route.LOGIN,
      }"
      class="w-full"
    >
      {{ t('auth.forgot_password_form.return_to_login') }}
    </AppButton>

    <FormElement
      v-else
      :form="form"
    >
      <FormSpacer>
        <FormLabel
          :label="t('common.email')"
          :error="state.email.error"
        >
          <FormInput
            v-model="state.email.value"
            :has-error="!!state.email.error"
            type="email"
          />
        </FormLabel>
      </FormSpacer>

      <FormButton
        :form="form"
        :disable-if-not-dirty="false"
        class="mt-6 w-full"
      >
        {{ t('auth.forgot_password_form.send') }}
      </FormButton>
    </FormElement>
  </AuthPage>
</template>
