<script setup lang="ts">
import { PRIVACY_AND_SECURITY_EXCLAMATIONMARK_TRIANGLE_FILL } from '@wouterlms/icons'
import { colors } from '@/theme'

interface Props {
  label?: string
  error?: string | boolean | null
}

const props = withDefaults(defineProps<Props>(), {
  label: undefined,
  error: undefined,
})

const labelColor = computed<string>(() => {
  const { error } = props

  if (typeof error === 'string' || error === true)
    return colors.value.accent.danger[500]

  return colors.value.text.secondary
})

const showErrorMessage = computed(() => typeof props.error === 'string')
</script>

<template>
  <label>
    <span
      v-if="label != null"
      :style="{
        color: labelColor,
      }"
      class="duration-200 text-sm"
    >
      {{ label }}
    </span>

    <slot />

    <AppHeightTransition :duration="200">
      <div v-if="showErrorMessage">
        <div class="flex gap-x-2 items-center mt-0.5">
          <AppIcon
            :icon="PRIVACY_AND_SECURITY_EXCLAMATIONMARK_TRIANGLE_FILL"
            :secondary-color="colors.background.primary"
            :style="{
              color: colors.accent.danger[500],
            }"
            class="w-3.5"
          />

          <span
            :style="{
              color: colors.accent.danger[500],
            }"
            class="text-sm"
          >
            {{ error }}
          </span>
        </div>
      </div>
    </AppHeightTransition>
  </label>
</template>
