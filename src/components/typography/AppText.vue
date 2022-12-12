<script setup lang="ts">
interface Props {
  variant: 'display-4' | 'display-3' | 'display-2' | 'display-1' | 'headline' | 'title' | 'body-2' | 'body-1' | 'caption'
  truncate?: boolean | number
  as?: string
}

const props = withDefaults(defineProps<Props>(), {
  truncate: false,
})

const classes = computed(() => {
  const { truncate, variant } = props
  const classes: string[] = []

  if (truncate === true)
    classes.push('truncate')

  switch (variant) {
    case 'display-4':
      classes.push('text-4xl md:text-5xl text-primary')
      break
    case 'display-3':
      classes.push('text-3xl md:text-4xl text-primary')
      break
    case 'display-2':
      classes.push('text-2xl md:text-3xl text-primary')
      break
    case 'display-1':
      classes.push('text-xl: md:text-2xl text-primary')
      break
    case 'headline':
      classes.push('text-lg md:text-xl text-primary')
      break
    case 'title':
      classes.push('text-lg')
      break
    case 'body-2':
      classes.push('text-base')
      break
    case 'body-1':
      classes.push('text-sm')
      break
    case 'caption':
      classes.push('text-xs')
      break
  }

  return classes.join(' ')
})

const component = computed(() => {
  const { as, variant } = props

  if (as !== undefined)
    return as

  switch (variant) {
    case 'display-4':
    case 'display-3':
    case 'display-2':
    case 'display-1':
    case 'headline':
      return 'h1'
    default:
      return 'p'
  }
})

const styles = computed(() => {
  const styles: Record<string, string> = {}

  if (typeof props.truncate === 'number') {
    styles.overflow = 'hidden'
    styles.display = '-webkit-box'
    styles['-webkit-line-clamp'] = props.truncate.toString()
    styles['-webkit-box-orient'] = 'vertical'
  }

  return styles
})
</script>

<template>
  <Component
    :is="component"
    :class="classes"
    :style="styles"
  >
    <slot />
  </Component>
</template>
