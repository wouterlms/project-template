<script setup lang="ts">
interface Props {
  value: string | null
}

const props = withDefaults(defineProps<Props>(), {})

const wrapperEl = ref<HTMLElement | null>(null)
const appendContentEl = ref<HTMLElement | null>(null)
const maxWidth = ref('0px')
const isMounted = ref(false)

const style = reactive({
  fontSize: '0px',
  paddingLeft: '0px',
})

onMounted(() => {
  isMounted.value = true
})

watch([
  (): string | null => props.value,
  isMounted,
], () => {
  const input = (wrapperEl.value!.querySelector('input') ?? null) as HTMLInputElement | null

  if (input === null)
    throw new Error('No input element found')

  const {
    fontSize,
    paddingLeft,
    paddingRight,
    width,
  } = getComputedStyle(input)

  const { width: contentWidth } = getComputedStyle(appendContentEl.value!)

  style.fontSize = fontSize
  style.paddingLeft = `${input.offsetLeft + parseFloat(paddingLeft)}px`

  // - 1px so it doesn't overlap with the input border
  maxWidth.value = `calc(${width} - ${contentWidth} - ${paddingRight} - 1px)`
})
</script>

<template>
  <div
    ref="wrapperEl"
    class="relative"
  >
    <slot />

    <div
      class="-translate-y-1/2
      absolute
      flex
      h-full
      items-center
      left-[1px]
      pointer-events-none
      top-1/2"
      :style="style"
    >
      <span
        :style="{
          maxWidth,
        }"
        class="opacity-0 whitespace-pre"
      >
        {{ value }}
      </span>

      <div
        ref="appendContentEl"
        class="bg-input flex h-[75%] items-center"
      >
        <slot name="append" />
      </div>
    </div>
  </div>
</template>
