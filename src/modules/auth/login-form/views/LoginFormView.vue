<script setup lang="ts">
import { FormElement, useForm } from '@wouterlms/forms'
import { FormInput, FormLabel } from '@wouterlms/ui'

import {
  useLoginFormService,
  useLoginFormState,
} from '../composables'

import { useLocalStorage } from '@/composables'
import { LocalStorageKey } from '@/enums'

const { t } = useI18n()

const lastLoggedInUser = useLocalStorage(LocalStorageKey.LAST_LOGGED_IN_USER, null)

const formState = useLoginFormState()
const { handleSubmit } = useLoginFormService(formState)

const title = lastLoggedInUser.value === null
  ? t('auth.login.title')
  : t('auth.login.personalised_title', { name: lastLoggedInUser.value.firstName })

const form = useForm(formState, {
  handleSubmit,
})

const { formObject } = formState

const handleTestAccountLogin = (email: string, password: string): void => {
  formState.setData({
    email,
    password,
  })

  setTimeout(() => {
    form.submit()
  }, 0)
}
</script>

<template>
  <AuthPage
    :title="title"
    :description="t('auth.login.description')"
  >
    <LoginFormTestAccounts
      :form="form"
      @login="handleTestAccountLogin"
    />

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
