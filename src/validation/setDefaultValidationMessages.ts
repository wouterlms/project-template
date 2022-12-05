import { setDefaultMessages } from '@wouterlms/validation'

export default (): void => {
  const { t } = useI18n()

  setDefaultMessages({
    required: t('validation.required'),
    email: t('validation.email'),
    url: t('validation.url'),
    maxFileSize: (_, maxFileSize) => t('validation.max_file_size', { maxFileSize }),
    min: (_, min) => {
      if ((min as Date) instanceof Date)
        return t('validation.min_date', { min: (min as Date).toLocaleDateString() })

      return t('validation.min', { min })
    },
    max: (_, max) => {
      if ((max as Date) instanceof Date)
        return t('validation.max_date', { max: (max as Date).toLocaleDateString() })

      return t('validation.max', { max })
    },
    minLength: (value, minLength) => {
      if (Array.isArray(value))
        return t('validation.min_array_length', { minLength })

      return t('validation.min_length', { minLength })
    },
    maxLength: (value, maxLength) => {
      if (Array.isArray(value))
        return t('validation.max_array_length', { maxLength })

      return t('validation.max_length', { maxLength })
    },
  })
}
