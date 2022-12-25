<script setup lang="ts">
interface Props {
  /**
   * Icon
   */
  icon: string

  /**
   * Retains inline colors
   */
  preserveOriginalColor?: boolean

  /**
   * Secondary color
   */
  secondaryColor?: string
}

const props = withDefaults(defineProps<Props>(), {
  preserveOriginalColor: false,
  secondaryColor: 'transparent',
})

const removeHexColors = (path: string): string => {
  let pathWithoutHexCodes = path

  const hexColors = path.match(/#[a-fA-F0-9]{6}|#[a-fA-F0-9]{3}/g) || []

  hexColors.forEach((hex) => {
    pathWithoutHexCodes = pathWithoutHexCodes.replace(hex, 'currentColor')
  })

  return pathWithoutHexCodes
}

const viewBox = computed<Nullable<string>>(() => {
  const { icon } = props

  const wrapper = document.createElement('div')

  wrapper.innerHTML = icon

  const viewbox = wrapper.querySelector('svg')!.getAttribute('viewBox')

  return viewbox
})

const paths = computed<string>(() => {
  const {
    icon,
    preserveOriginalColor,
    secondaryColor,
  } = props

  const wrapper = document.createElement('div')

  wrapper.innerHTML = icon

  const svgContent = Array.from(wrapper.children)
    .map((c) => c.innerHTML)
    .join('')

  if (preserveOriginalColor === true)
    return svgContent

  let pathWithoutHexColors = removeHexColors(svgContent)

  pathWithoutHexColors = pathWithoutHexColors
    .replaceAll('black', 'currentColor')
    .replaceAll('white', secondaryColor)

  return pathWithoutHexColors
})
</script>

<template>
  <svg
    :viewBox="viewBox ?? undefined"
    class="fill-current"
    preserveAspectRatio="xMinYMin meet"
    width="100%"
    height="100%"
    v-html="paths"
  />
</template>
