<script setup lang="ts">
import { FormElement, useForm } from '@wouterlms/forms2'
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
  ? t('common.sign_in')
  : t('auth.login_form.welcome_back', { name: lastLoggedInUser.value.firstName })

const form = useForm(formState, {
  handleSubmit,
})

const { state } = formState

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
    :description="t('auth.login_form.sign_in_to_continue')"
  >
    <LoginFormTestAccounts
      :form="form"
      @login="handleTestAccountLogin"
    />

    <FormElement :form="form">
      <FormSpacer>
        <FormLabel
          :label="t('common.email')"
          :error="state.email.error"
        >
          <FormInput
            v-model="state.email.value"
            :error="!!state.email.error"
            type="email"
          />
        </FormLabel>

        <FormLabel
          :label="t('common.password')"
          :error="state.password.error"
        >
          <FormInput
            v-model="state.password.value"
            :error="!!state.password.error"
            type="password"
          />
        </FormLabel>

        <FormButton
          :form="form"
          class="w-full"
        >
          {{ t('common.sign_in') }}
        </FormButton>
      </FormSpacer>
    </FormElement>
  </AuthPage>
</template>
