import { Typography } from 'antd'
import { useHasHydrated } from '@/features/FindATaxi/hooks/useHasHydrated'
import { useTranslations } from 'next-intl'

interface IProps {
  hotelName: string | undefined
  fullName: string | undefined
}

function WelcomeText({ hotelName, fullName }: IProps) {
  const hydrated = useHasHydrated()
  const t = useTranslations()

  if (!hydrated) {
    return null
  }

  return (
    <div className="py-5 md:px-6">
      <Typography.Title
        level={4}
        className="block text-sm font-normal text-primary-dark md:text-base"
      >
        {t('booking.welcome', {
          name: fullName ?? '',
        })}
      </Typography.Title>
      <Typography.Title
        level={4}
        className="block text-sm font-normal text-primary-dark md:text-base"
      >
        {t('booking.booking-confirmed', { name: hotelName ?? '' })}
      </Typography.Title>
    </div>
  )
}

export default WelcomeText
