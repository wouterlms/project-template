<script setup lang="ts">
import { AppButton } from '@wouterlms/ui'
import type { useForm } from '@wouterlms/forms'

interface Props {
  form: ReturnType<typeof useForm>
  disableIfNotDirty?: boolean
}

withDefaults(defineProps<Props>(), {
  disableIfNotDirty: true,
})
</script>

<template>
  <AppButton
    :is-disabled="!form.isDirty && disableIfNotDirty"
    :is-loading="form.isSubmitting"
    type="submit"
  >
    <slot />
  </AppButton>
</template>
