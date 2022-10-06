<script setup lang="ts">
interface Props {
  message: Nullable<string>
  status: number
}

withDefaults(defineProps<Props>(), {})

const { t } = useI18n()

const httpErrorMap = new Map<string, string>(Object.entries({
  400: t('suspense.bad_request'),
  401: t('suspense.unauthorized'),
  403: t('suspense.forbidden'),
  404: t('suspense.not_found'),
  500: t('suspense.server_error'),
}))
</script>

<template>
  <div class="flex items-center p-4">
    <div class="border-primary border-r border-solid px-4 text-tertiary/75 tracking-wider">
      {{ status }}
    </div>

    <div class="px-4 text-tertiary/75 tracking-wider uppercase">
      {{ message
        ?? httpErrorMap.get(`${status}`)
        ?? t('suspense.something_went_wrong')
      }}
    </div>
  </div>
</template>
