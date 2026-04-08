import { useRouter } from 'next/router'
import { useQuery } from '@tanstack/react-query'

import { Typography } from 'antd'
import dayjs from 'dayjs'
import { useTranslations } from 'next-intl'
import { getBookingsItem } from '../../api'
import BlurImage from '@/components/common/BlurImage'
import HotelIcon from '@/components/icons/hotel'
import { useMediaQuery } from '@/utils/useMediaQuery'

const DetailsHotelInformation = () => {
  const { query, locale } = useRouter()
  const t = useTranslations()
  const isSmall = useMediaQuery('(max-width: 576px)')

  const { data } = useQuery({
    queryKey: ['bookings-detail'],
    queryFn: () => getBookingsItem(query.bookingId as any),
    enabled: Boolean(Number(query.bookingId)),
  })

  const daysDiff = dayjs(data?.end_date).diff(dayjs(data?.start_date), 'day')

  return (
    <div className="grid grid-cols-1 gap-4 py-5 md:px-6 lg:grid-cols-5">
      <div
        className={`col-span-1 flex gap-4 lg:col-span-3 ${isSmall ? 'flex-col items-start' : 'flex-row items-center'}`}
      >
        <div className="relative h-[108px] w-[108px] shrink-0 overflow-hidden rounded-[16px] bg-[#FAFAFA]">
          {data?.placement?.image ? (
            <BlurImage
              fill
              src={data?.placement?.image}
              alt="hotel image"
              className="h-full w-full object-cover"
              fallbackEl={
                <HotelIcon className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl text-secondary" />
              }
            />
          ) : null}
        </div>
        <div className="flex flex-col">
          <div className="mb-2 font-bold">{data?.placement?.name}</div>
          <ul className="flex flex-col text-[14px] text-primary-dark">
            <li>
              <span className="font-semibold">{t('my-properties.address')}: </span>
              <span className="translate">{data?.placement?.address}</span>
            </li>

            <li>
              <span className="font-semibold">{t('personal-information.phone-number')}: </span>
              {data?.placement?.user?.phone}
            </li>
            {/* <li>
              <span className="font-semibold">{t('booking.coords')}: </span>
              {t('booking.pin-code')}
            </li> */}
          </ul>
        </div>
      </div>
      <div
        className={`col-span-1 flex lg:col-span-2 ${isSmall ? 'flex-col divide-y' : 'flex-row divide-x'}`}
      >
        <div className={`flex flex-col ${isSmall ? 'pb-4' : 'px-6 pl-0'}`}>
          <Typography className="text-sm">{t('user.check-in')}</Typography>
          <Typography className="mb-[4px] mt-[8px] text-base font-semibold">
            {dayjs(data?.start_date)
              .locale(locale === 'uz' ? 'uz-latn' : locale || '')
              .format('ddd, DD MMM. YYYY')}
          </Typography>
          <Typography className="font-sm text-[#777E90]">
            {t('user.dan', {
              time: data?.placement?.checkin_start?.split(':')?.slice(0, 2)?.join(':') ?? '',
            })}
          </Typography>
        </div>
        <div className={`flex flex-col ${isSmall ? 'py-4 pl-0' : 'px-6'}`}>
          <Typography className="text-sm">{t('user.check-out')}</Typography>
          <Typography className="mb-[4px] mt-[8px] text-base font-semibold">
            {dayjs(data?.end_date)
              .locale(locale === 'uz' ? 'uz-latn' : locale || '')
              .format('ddd, DD MMM. YYYY')}
          </Typography>
          <Typography className="font-sm text-[#777E90]">
            {t('user.gacha', {
              time: data?.placement?.checkout_end?.split(':')?.slice(0, 2)?.join(':') ?? '',
            })}
          </Typography>
        </div>
        <div className={`flex flex-col ${isSmall ? 'pl-0 pt-4' : 'pl-6'}`}>
          <span className="mb-2 text-[14px] text-primary-dark">{t('hotels.information')}</span>
          <span className="mb-1 font-semibold text-primary-dark">
            {data?.items[0]?.person_count} {t('booking.people')} / {daysDiff}{' '}
            {daysDiff > 1 ? t('booking.night') : t('preferences.night')}
          </span>
        </div>
      </div>
    </div>
  )
}

export default DetailsHotelInformation
