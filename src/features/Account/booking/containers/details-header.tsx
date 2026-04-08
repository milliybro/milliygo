import Logo from '@/components/icons/logo'
import { useTranslations } from 'next-intl'
import { getBookingsItem } from '../../api'
import { useRouter } from 'next/router'
import { useQuery } from '@tanstack/react-query'
import { useMediaQuery } from '@/utils/useMediaQuery'

const DetailsHeader = () => {
  const t = useTranslations()
  const isSmall = useMediaQuery('(max-width: 576px)')

  const { query } = useRouter()

  const { data } = useQuery({
    queryKey: ['bookings-detail'],
    queryFn: () => getBookingsItem(query.bookingId as any),
    enabled: Boolean(Number(query.bookingId)),
  })

  return (
    <div
      className={`flex justify-between gap-4 py-5 md:px-6 ${isSmall ? 'flex-col items-start' : 'flex-row items-center'}`}
    >
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
