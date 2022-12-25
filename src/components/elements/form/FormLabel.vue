<script setup lang="ts">
import { AppIcon, colors } from '@wouterlms/ui'
import { PRIVACY_AND_SECURITY_EXCLAMATIONMARK_TRIANGLE_FILL } from '@wouterlms/icons'

interface Props {
  label: string
  error?: string | boolean | null
}

const props = withDefaults(defineProps<Props>(), {})

const showErrorMessage = computed(() => typeof props.error === 'string')
</script>

<template>
  <label>
    <AppText
      :class="{
        'text-accent-danger': showErrorMessage || error,
      }"
      variant="body-1"
      class="duration-200"
    >
      {{ label }}
    </AppText>

    <slot />

    <AppHeightTransition :duration="200">
      <div v-if="showErrorMessage">
        <div class="flex gap-x-2 items-center mt-0.5">
          <AppIcon
            :icon="PRIVACY_AND_SECURITY_EXCLAMATIONMARK_TRIANGLE_FILL"
            :secondary-color="colors.background.primary"
            class="text-accent-danger w-3.5"
          />
          <AppText
            variant="body-1"
            class="text-accent-danger"
          >
            {{ error }}
          </AppText>
        </div>
      </div>
    </AppHeightTransition>
  </label>
</template>
