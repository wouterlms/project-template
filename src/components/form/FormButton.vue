<script setup lang="ts">
import { AppButton } from '@wouterlms/ui'
import type { useForm } from '@wouterlms/forms'

interface Props {
  form: ReturnType<typeof useForm>
}

withDefaults(defineProps<Props>(), {})
</script>

<template>
  <AppButton
    :is-disabled="!form.isDirty"
    :is-loading="form.isSubmitting"
    type="submit"
  >
    <slot />
  </AppButton>
</template>
