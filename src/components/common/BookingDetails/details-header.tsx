import Logo from '@/components/icons/logo'
import { useTranslations } from 'next-intl'

const DetailsHeader = ({ data }: any) => {
  const t = useTranslations()

  return (
    <div className="flex items-center justify-between px-6 py-5">
      <Logo className="text-5xl" />
      <ul className="flex flex-col gap-[4px] text-[14px] text-primary-dark">
        <li>{t('booking.booking-confirmation')}</li>
        <li>
          {t('booking.confirmation-number')}{' '}
          <span className="ml-1 font-semibold text-primary">11{data?.id}</span>
        </li>
        <li>
          {t('booking.pin-code')}:{' '}
          <span className="ml-1 font-semibold text-primary">{data?.code}</span>
        </li>
      </ul>
    </div>
  )
}

export default DetailsHeader
