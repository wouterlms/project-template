<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'
import { useEventListener } from '@wouterlms/composables'

interface Props {
  title: string
  breadcrumbs?: {
    label: string
    to?: RouteLocationRaw
  }[]
}

withDefaults(defineProps<Props>(), {
  breadcrumbs: () => [],
})

const header = ref<Nullable<HTMLElement>>(null)
const headerHeight = ref<Nullable<number>>(null)
const hasOffsetTop = ref(false)
const previousScrollPosition = ref(0)
const shrink = ref(false)

useEventListener('scroll', () => {
  if (header.value === null)
    return

  const { top } = header.value.getBoundingClientRect()

  const hasScrolledDown = (hasOffsetTop.value ? top <= 0 : window.scrollY > 0)

  shrink.value = hasScrolledDown && previousScrollPosition.value < window.scrollY

  previousScrollPosition.value = window.scrollY
})

onMounted(() => {
  const { scrollHeight, offsetTop } = header.value!

  headerHeight.value = scrollHeight
  hasOffsetTop.value = offsetTop > 0
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
        shrink
          ? `bg-secondary/75
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
            v-if="breadcrumbs.length > 0"
            :class="{
              'opacity-0 -translate-y-5 scale-75': shrink,
            }"
            class="-translate-y-2 absolute duration-300 origin-left text-sm"
          >
            <AppBreadcrumbs>
              <AppBreadcrumbItem
                v-for="{ to, label } of breadcrumbs"
                :key="label"
                :to="to"
              >
                {{ label }}
              </AppBreadcrumbItem>
            </AppBreadcrumbs>
          </div>

          <h1
            :class="[
              shrink
                ? 'scale-75 translate-y-0'
                : breadcrumbs.length === 0 ? '' : 'translate-y-3',
            ]"
            class="duration-300 font-medium origin-left text-2xl text-primary"
          >
            <slot name="title">
              {{ title }}
            </slot>
          </h1>
        </div>

        <slot name="right" />
      </AppContainer>
    </div>
  </header>
</template>
