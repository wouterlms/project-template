<script setup lang="ts">
import { useForm, FormElement } from '@wouterlms/forms'
import {
  FormInput,
  FormLabel
} from '@wouterlms/ui'

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
    :title="t('auth.forgot_password.title')"
    :description="hasSentEmail
      ? t('auth.forgot_password.success_message')
      : t('auth.forgot_password.description')"
  >
    <AppLink
      is="RouterLink"
      v-if="hasSentEmail"
      :to="{
        name: Route.LOGIN
      }"
    >
      {{ t('auth.forgot_password.return_to_login') }}
    </AppLink>

    <FormElement
      v-else
      :form="form"
    >
      <FormSpacer>
        <FormLabel
          :label="t('form.email')"
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
          {{ t('auth.forgot_password.action') }}
        </FormButton>
      </FormSpacer>
    </FormElement>
  </AuthPage>
</template>
