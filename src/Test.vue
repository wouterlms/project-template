<script setup lang="ts">
import { AppButton } from '@wouterlms/ui'
import { Icon } from '@wouterlms/icons'
import { http } from './http'
import { useAuth } from '@/composables'
import { Route } from '@/routes'

const router = useRouter()
const auth = useAuth()

const isSigningOut = ref(false)

const signOut = async (): Promise<void> => {
  isSigningOut.value = true

  auth.signOut()
  router.replace({ name: Route.LOGIN })
}

http.get('/example/mock')
</script>

<template>
  <AppPageHeader
    title="Test page"
    :breadcrumbs="[
      {
        label: 'Home',
        to: {
          name: Route.LOGIN,
        },
      },
      {
        label: 'Test page',
      },
    ]"
  >
    <template #right>
      <AppButton
        :is-loading="isSigningOut"
        :icon-right="Icon.ARROWS_CHEVRON_RIGHT"
        class="!px-6 !text-xs"
        @click="signOut"
      >
        Sign out
      </AppButton>
    </template>
  </AppPageHeader>

  <AppPageContent>
    <div class="h-[200vh]" />
  </AppPageContent>
</template>
