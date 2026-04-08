import { useTranslations } from 'next-intl'
import { ITourAgentOrderItem } from '../types'

interface TourBookingTouristTextProps {
  order: ITourAgentOrderItem | undefined
}

export default function TourBookingTouristText({ order }: TourBookingTouristTextProps) {
  const t = useTranslations()
  return (
    <div>
      <div className="text-sm font-medium text-green-500">
        {t('tours.tour-booked', { name: order?.tour?.name ?? '' })}
      </div>
      <div className="mb-1 mt-3 text-base font-semibold">
        {t('booking.welcome', {
          name: [
            order?.ordered_by?.last_name,
            order?.ordered_by?.first_name,
            order?.ordered_by?.middle_name,
          ]
            .filter(Boolean)
            .join(' '),
        })}
      </div>
      <div className="text-sm text-secondary">{t('tours.tour-booked-text')}</div>
    </div>
  )
}
