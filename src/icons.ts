enum Icon {
  TEST = 'TEST',
}

const svgs = import.meta.glob('./assets/svg/*.svg', {
  as: 'raw',
  eager: true,
})

const mappedSvgs = Object.entries(svgs).reduce<Record<string, string>>((acc, [key, value]) => {
  const name = key.split('/').pop()!.split('.').shift()!.toUpperCase()

  return {
    ...acc,
    [name]: value,
  }
}, {})

export const icons: Record<Icon, string> = mappedSvgs
