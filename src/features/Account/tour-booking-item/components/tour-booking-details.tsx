import { useTranslations } from 'next-intl'
import { ITourAgentOrderItem } from '../types'

interface TourBookingDetailsProps {
  order: ITourAgentOrderItem | undefined
}

export default function TourBookingDetails({ order }: TourBookingDetailsProps) {
  const t = useTranslations()

  return (
    <div>
      <div className="basis-full text-lg font-bold">{t('tours.tour-program-detail')}</div>
      <div className="mt-[7px] flex flex-col flex-wrap items-start justify-between gap-y-[7px] *:basis-1/2 sm:flex-row sm:items-center">
        <div>{t('routes.transport')}:</div>
        <div className="text-left font-semibold sm:text-right">
          {order?.tour?.transports?.map((transport) => transport?.name)?.join(', ')}
        </div>
        <div>{t('tours.hotel')}:</div>
        <div className="translate text-left font-semibold sm:text-right">
          - ({t('travel-package.nights', { count: order?.tour_details?.duration_nights ?? '' })})
        </div>
        <div>{t('tours.route')}:</div>
        <div className="text-left font-semibold sm:text-right">
          {order?.tour?.regions?.join(', ')}
        </div>
        <div>{t('inputs.meals')}:</div>
        <div className="text-left font-semibold sm:text-right">
          {' '}
          {t(`meal-plans.${order?.tour_details?.meal_plan}`)}
        </div>
        <div>{t('booking.guides')}:</div>
        <div className="text-left font-semibold sm:text-right">-</div>
      </div>
    </div>
  )
}
