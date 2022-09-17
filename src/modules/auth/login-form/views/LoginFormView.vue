<script setup lang="ts">
import { useForm, FormElement } from '@wouterlms/forms'
import { FormInput, FormLabel } from '@wouterlms/ui'

import { useLoginFormService, useLoginFormState } from '../composables'

const { t } = useI18n()

const formState = useLoginFormState()
const { handleSubmit } = useLoginFormService(formState)

const form = useForm(formState, {
  handleSubmit,
})

const { formObject } = formState
</script>

<template>
  <AuthPage
    :title="t('auth.login.title')"
    :description="t('auth.login.description')"
  >
    <FormElement :form="form">
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

        <FormLabel
          :label="t('form.password')"
          :error="formObject.password.error"
        >
          <FormInput
            v-model="formObject.password.value"
            :error="!!formObject.password.error"
            type="password"
          />
        </FormLabel>

        <FormButton
          :form="form"
          class="w-full"
        >
          {{ t('auth.login.action') }}
        </FormButton>
      </FormSpacer>
    </FormElement>
  </AuthPage>
</template>
