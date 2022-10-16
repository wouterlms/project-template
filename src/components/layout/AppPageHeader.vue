<script setup lang="ts">
import { useEventListener } from '@wouterlms/composables'

interface Props {
  title: string
}

withDefaults(defineProps<Props>(), {})

const header = ref<Nullable<HTMLElement>>(null)
const headerHeight = ref<Nullable<number>>(null)
const hasScrolledDown = ref(false)

useEventListener('scroll', () => {
  if (header.value === null)
    return

  const { top } = header.value.getBoundingClientRect()

  hasScrolledDown.value = top === 0
})

onMounted(() => {
  headerHeight.value = header.value!.scrollHeight
})
</script>

<template>
  <header
    ref="header"
    :style="{
      height: headerHeight === null ? undefined : `${headerHeight}px`,
    }"
    class="sticky top-0"
  >
    <div
      :class="[
        hasScrolledDown
          ? `bg-secondary/50
            backdrop-filter
            backdrop-blur-md
            -translate-y-4
            pb-2.5
            border-transparent
          `
          : 'bg-primary pb-6 border-primary',
      ]"
      class="absolute
        border-b
        border-solid
        duration-300
        left-0
        pt-6
        top-0
        w-full"
    >
      <AppContainer class="flex items-center justify-between">
        <div>
          <div
            :class="{
              'opacity-0 -translate-y-5 scale-75': hasScrolledDown,
            }" class="-translate-y-2 absolute duration-300 origin-left text-sm"
          >
            <AppBreadcrumbs>
              <AppBreadcrumbItem to="/">
                Apps
              </AppBreadcrumbItem>

              <AppBreadcrumbItem>
                HNTR
              </AppBreadcrumbItem>
            </AppBreadcrumbs>
          </div>

          <h1
            :class="[
              hasScrolledDown ? 'scale-75 translate-y-0' : 'translate-y-3',
            ]" class="duration-300 font-medium origin-left text-2xl text-primary"
          >
            {{ title }}
          </h1>
        </div>

        <slot name="right" />
      </AppContainer>
    </div>
  </header>
</template>
