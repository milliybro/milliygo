import { useHasHydrated } from '@/hooks/useHasHydrated'
import { Typography } from 'antd'
import { useTranslations } from 'next-intl'

interface IProps {
  hotelName?: string
  data?: any
}

function WelcomeText({ hotelName, data }: IProps) {
  const hydrated = useHasHydrated()
  const t = useTranslations()

  if (!hydrated) {
    return null
  }

  return (
    <div className="px-6 py-5">
      <Typography.Title level={4} className="block text-base font-normal text-primary-dark">
        {t('booking.welcome', {
          name: `
            ${data?.first_name || data?.username} 
            ${!data?.username || !!data?.first_name ? data?.last_name : ''}`,
        })}
      </Typography.Title>
      <Typography.Title level={4} className="block text-base font-normal text-primary-dark">
        {t('booking.booking-confirmed', { name: hotelName ?? '' })}
      </Typography.Title>
    </div>
  )
}

export default WelcomeText
