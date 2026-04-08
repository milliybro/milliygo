import dayjs from 'dayjs'
import { useTranslations } from 'next-intl'

export function useMaskedDateValidator(beforeToday?: boolean) {
  const t = useTranslations()

  return (_: any, value: string) => {
    const parsed = dayjs(value, 'DD.MM.YYYY', true)
    if (parsed.isValid() && (beforeToday ? parsed.isBefore(dayjs()) : true)) {
      return Promise.resolve()
    }

    return Promise.reject(new Error(t('inputs.invalid-date')))
  }
}
