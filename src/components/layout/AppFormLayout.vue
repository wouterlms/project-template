<script setup lang="ts">
import { AppLoader } from '@wouterlms/ui'
import { useEventListener } from '@wouterlms/composables'
import type { useForm } from '@wouterlms/forms'

interface Props {
  form: ReturnType<typeof useForm>
  enableControls?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  enableControls: false,
})

const { t } = useI18n()

const isScrolledDown = ref(false)

const showControls = computed(
  () => props.enableControls && (props.form.isDirty || (props.form.isDirty && isScrolledDown)
  ))

useEventListener('scroll', () => {
  isScrolledDown.value = window.scrollY > 0
})
</script>

<template>
  <div
    :class="{
      'pb-12': !showControls,
    }"
    class="flex flex-col gap-y-8 h-full lg:gap-y-12 w-full"
  >
    <slot v-if="form.isReady" />

    <CenterContent v-else>
      <AppLoader>
        {{ t('layout.loading_form') }}
      </AppLoader>
    </CenterContent>

    <Transition name="form-controls-transition">
      <div
        v-if="showControls"
        class="bg-primary
        border-primary
        border-solid
        border-t
        bottom-0
        flex
        justify-end
        p-6
        sticky"
      >
        <FormButton
          :form="form"
          class="text-xs"
        >
          <slot name="submit-button">
            {{ t('common.save_changes') }}
          </slot>
        </FormButton>
      </div>
    </Transition>
  </div>
</template>

<style scoped lang="scss">
.form-controls-transition {
  &-enter-active,
  &-leave-active {
    transition: 0.3s;
  }

  &-enter-from,
  &-leave-to {
    opacity: 0;
    transform: translateY(100%);
  }
}
</style>
