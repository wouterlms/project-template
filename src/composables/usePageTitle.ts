import { useTitle } from '@wouterlms/composables'

export default (): void => {
  const { t } = useI18n()
  const { documentTitle } = useTitle()
  const route = useRoute()

  watch(() => route.name, (name) => {
    if (typeof name === 'string')
      documentTitle.value = t(`static.page_title.${name.replaceAll('-', '_')}`)
  }, { immediate: true })
}
