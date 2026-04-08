import { useTranslations } from 'next-intl'
import { useRouter } from 'next/router'
import { useQuery } from '@tanstack/react-query'
import { getBookingsItem } from '../../api'
import { useMediaQuery } from '@/utils/useMediaQuery'

function DetailsFacilities() {
  const { query } = useRouter()
  const t = useTranslations()
  const isSmall = useMediaQuery('(max-width: 576px)')

  const { data } = useQuery({
    queryKey: ['bookings-detail'],
    queryFn: () => getBookingsItem(query?.bookingId as any),
    enabled: Boolean(Number(query?.bookingId)),
  })

  return (
    <div className="mt-0 flex flex-col gap-5 py-5 md:mt-4 md:px-6">
      <div>
        <h2 className="mb-3 text-lg font-semibold md:mb-4 md:font-bold">
          {t('booking.view-details')}:
        </h2>

        <div className="flex flex-col justify-between gap-3 divide-x md:gap-4 lg:flex-row">
          <div className="flex flex-1 flex-col gap-2 md:gap-3">
            <p
              className={`flex justify-between text-xs text-primary-dark md:text-[14px] ${isSmall ? 'flex-col' : 'flex-row'}`}
            >
              <span>{t('user.type-number')}:</span>{' '}
              <span className="font-medium md:font-semibold">{data?.items?.[0]?.room?.name}</span>
            </p>
            <p
              className={`flex justify-between text-xs text-primary-dark md:text-[14px] ${isSmall ? 'flex-col' : 'flex-row'}`}
            >
              <span>{t('booking.guest')}:</span>{' '}
              <span className="font-medium md:font-semibold">
                {data?.first_name} {data?.last_name}
              </span>
            </p>
            <p
              className={`flex justify-between text-xs text-primary-dark md:text-[14px] ${isSmall ? 'flex-col' : 'flex-row'}`}
            >
              <span>{t('inputs.meals')}:</span>{' '}
              <span className="font-medium md:font-semibold">{t('booking.meal')}</span>
            </p>

            <p className="text-[14px] text-primary-dark">
              {data?.items?.[0]?.room?.facilities?.map((fc) => fc?.name)?.join(' • ')}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailsFacilities
