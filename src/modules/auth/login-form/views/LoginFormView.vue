<script setup lang="ts">
import { FormElement, useForm } from '@wouterlms/forms'

import {
  useLoginFormService,
  useLoginFormState,
} from '../composables'

import { useLoginStore } from '@/stores'

import { Route } from '@/enums'

const { t } = useI18n()

const loginStore = useLoginStore()
const formState = useLoginFormState()

const { lastLoggedInUser } = loginStore

const { handleSubmit } = useLoginFormService(formState)

const title = lastLoggedInUser === null
  ? t('common.sign_in')
  : t('auth.login_form.welcome_back', { name: lastLoggedInUser.firstName })

const form = useForm(formState, {
  handleSubmit,
})

const { state } = formState
</script>

<template>
  <AuthPage
    :title="title"
    :description="t('auth.login_form.sign_in_to_continue')"
  >
    <FormElement :form="form">
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

        <FormLabel
          :label="t('common.password')"
          :error="state.password.error"
        >
          <FormInput
            v-model="state.password.value"
            :has-error="!!state.password.error"
            type="password"
          />
        </FormLabel>
      </FormSpacer>

      <RouterLink
        :to="{ name: Route.FORGOT_PASSWORD }"
        class="hover:underline mt-1.5 self-start"
      >
        <AppText variant="body-1">
          {{ t('auth.login_form.forgot_password') }}
        </AppText>
      </RouterLink>

      <FormButton
        :form="form"
        class="mt-6 w-full"
      >
        {{ t('common.sign_in') }}
      </FormButton>
    </FormElement>
  </AuthPage>
</template>
