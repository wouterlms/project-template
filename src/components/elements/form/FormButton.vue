<script setup lang="ts">
import type { UseForm } from '@wouterlms/forms'

interface Props {
  form: UseForm
  disableIfNotDirty?: boolean
  isDisabled?: boolean
}

withDefaults(defineProps<Props>(), {
  disableIfNotDirty: true,
  isDisabled: false,
})
</script>

<template>
  <AppButton
    :is-disabled="(!form.isDirty && disableIfNotDirty) || isDisabled"
    :is-loading="form.isSubmitting"
    type="submit"
  >
    <slot />
  </AppButton>
</template>
