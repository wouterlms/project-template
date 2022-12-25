enum Icon {
  EYE = 'EYE',
  EYE_SLASH = 'EYE_SLASH',
}

const svgs = import.meta.glob('./assets/svg/*.svg', {
  as: 'raw',
  eager: true,
})

const mappedSvgs = Object.entries(svgs).reduce<Record<string, string>>((acc, [key, value]) => {
  const name = key.split('/').pop()!.split('.').shift()!.toUpperCase().replaceAll('-', '_')

  return {
    ...acc,
    [name]: value,
  }
}, {})

export const icons: Record<Icon, string> = mappedSvgs
