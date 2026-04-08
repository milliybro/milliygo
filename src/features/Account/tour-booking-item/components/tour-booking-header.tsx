import { useTranslations } from 'next-intl'
import Logo from '@/components/icons/logo'

export default function TourBookingHeader({ tourId, data }: any) {
  const t = useTranslations()

  return (
    <div className="flex flex-wrap items-start justify-between gap-3">
      <Logo />

      <div className="flex flex-col gap-1">
        <div className="flex gap-2 text-sm font-medium">
          <div>{t('tours.booking-number')}:</div>
          <div className="text-primary">22{tourId}</div>
        </div>
        <div className="flex gap-2 text-sm font-medium">
          <div>{t('tours.applicable_from')}:</div>
          <div className="text-primary">{data?.created_at?.split('T')?.at(0)}</div>
        </div>
        <div className="flex gap-2 text-sm font-medium">
          <div>{t('tours.status-pay')}:</div>
          <div className="text-primary">{t('tours.status-pay-success')}</div>
        </div>
      </div>
    </div>
  )
}
