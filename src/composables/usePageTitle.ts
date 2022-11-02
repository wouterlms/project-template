import { useTitle } from '@wouterlms/composables'

export default (): void => {
  const { documentTitle } = useTitle()
  const { beforeEach } = useRouter()
  const { t } = useI18n()

  beforeEach(({ name }) => {
    if (typeof name === 'string')
      documentTitle.value = t(`static.page_title.${name.replaceAll('-', '_')}`)
  })
}
