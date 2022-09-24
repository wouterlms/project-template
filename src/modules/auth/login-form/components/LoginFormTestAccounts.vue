<script setup lang="ts">
import { AppFocusable, AppIcon } from '@wouterlms/ui'
import type { useForm } from '@wouterlms/forms'

import type { LoginFormState } from '@/types'
import { Icon } from '@/icons'

interface Props {
  form: ReturnType<typeof useForm<LoginFormState>>
}

withDefaults(defineProps<Props>(), {})

const emit = defineEmits<{(event: 'handleTestAccountLogin', email: string, password: string): void }>()

const { VITE_TEST_ACCOUNTS } = import.meta.env

const testAccountsEnv: string[] = JSON.parse(VITE_TEST_ACCOUNTS ?? '[]')

const testAccounts = testAccountsEnv.reduce((acc, [
  key,
  email,
  password
]) => {
  acc[key] = {
    email,
    password,
  }
  return acc
}, {} as Record<string, { email: string; password: string }>)
</script>

<template>
  <div
    v-if="Object.keys(testAccounts).length > 0"
    class="bottom-0 fixed p-3 right-0 sm:!bottom-auto sm:max-w-sm sm:p-4 sm:top-0 w-full"
  >
    <aside
      class="bg-input
      border
      border-input
      border-solid
      overflow-hidden
      rounded-lg
      shadow-card
      w-full"
    >
      <div class="border-b border-input border-solid p-4">
        <h1 class="font-medium">
          Meld aan met een test account
        </h1>
      </div>

      <ul>
        <li
          v-for="({ email, password }, key) of testAccounts"
          :key="email"
          class="border-b border-input border-solid last:border-none"
        >
          <AppFocusable
            :disabled="form.isSubmitting"
            class="flex gap-x-4 hover:bg-gray-primary overflow-hidden p-4 text-left w-full"
            @click="emit('handleTestAccountLogin', email, password)"
          >
            <AppIcon
              :icon="Icon.USER"
              class="-translate-y-1 flex-shrink-0 h-6 w-6"
            />

            <div>
              <div class="font-medium text-xs tracking-wide uppercase">
                {{ key }}
              </div>

              <div class="text-sm">
                {{ email }}
              </div>
            </div>
          </AppFocusable>
        </li>
      </ul>
    </aside>
  </div>
</template>
