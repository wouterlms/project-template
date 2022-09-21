<script setup lang="ts">
interface Props {
  message: Nullable<string>
  status: number
}

withDefaults(defineProps<Props>(), {})

const { t } = useI18n()

const httpErrorMap = new Map<string, string>(Object.entries({
  400: t('http_error.bad_request'),
  401: t('http_error.unauthorized'),
  403: t('http_error.forbidden'),
  404: t('http_error.not_found'),
  500: t('http_error.server_error'),
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
        ?? t('general.something_went_wrong')
      }}
    </div>
  </div>
</template>
