<script setup lang="ts">
import { FormElement, useForm } from '@wouterlms/forms'
import { FormInput, FormLabel } from '@wouterlms/ui'

import { useForgotPasswordFormService, useForgotPasswordFormState } from '../composables'
import { useForgotPasswordStore } from '@/stores'

import { Route } from '@/routes'

const { t } = useI18n()
const { hasSentEmail } = useForgotPasswordStore()

const formState = useForgotPasswordFormState()
const { handleSubmit } = useForgotPasswordFormService(formState)

const form = useForm(formState, {
  handleSubmit,
})

const { formObject } = formState

onBeforeUnmount(() => {
  hasSentEmail.value = false
})
</script>

<template>
  <AuthPage
    :title="t('auth.forgot_password_form.forgot_password')"
    :description="hasSentEmail
      ? t('auth.forgot_password_form.thank_you_within_a_few')
      : t('auth.forgot_password_form.dont_remember_your_password_enter')"
  >
    <AppLink
      is="RouterLink"
      v-if="hasSentEmail"
      :to="{
        name: Route.LOGIN,
      }"
    >
      {{ t('auth.forgot_password_form.return_to_login') }}
    </AppLink>

    <FormElement
      v-else
      :form="form"
    >
      <FormSpacer>
        <FormLabel
          :label="t('common.email')"
          :error="formObject.email.error"
        >
          <FormInput
            v-model="formObject.email.value"
            :error="!!formObject.email.error"
            type="email"
          />
        </FormLabel>

        <FormButton
          :form="form"
          class="w-full"
        >
          {{ t('auth.forgot_password_form.send') }}
        </FormButton>
      </FormSpacer>
    </FormElement>
  </AuthPage>
</template>
