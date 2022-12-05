<script setup lang="ts">
import {
  AppButton,
  AppIcon,
  AppMenu,
  AppMenuItem,
  FormInput,
} from '@wouterlms/ui'
import { ARROWS_CHEVRON_RIGHT, COMMERCE_GUARANISIGN_SQUARE } from '@wouterlms/icons'
import { http } from '@/plugins'
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

http.post('/business-pages', {
  userId: 2,
})
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
        :icon-right="ARROWS_CHEVRON_RIGHT"
        class="!px-6 !text-xs"
        @click="signOut"
      >
        Sign out
      </AppButton>
    </template>
  </AppPageHeader>

  <AppPageContent>
    <div class="h-[200vh]">
      <FormInput :model-value="null">
        <template #left>
          <AppMenu class="ml-2 outline-none">
            <AppIcon
              :icon="COMMERCE_GUARANISIGN_SQUARE"
              class="w-5"
            />

            <template #menu>
              <AppMenuItem>
                Item A
              </AppMenuItem>

              <AppMenuItem>
                Item 2
              </AppMenuItem>
            </template>
          </AppMenu>
        </template>
      </FormInput>
    </div>
  </AppPageContent>
</template>
