import { useTranslations } from 'next-intl'
import { useRouter } from 'next/router'
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { getBookingsItem } from '../../api'
import { formatNumber } from '@/helpers/number-formatter'
import useCurrencyStore from '@/store/currency'

const DetailsPriceInformation = () => {
  const t = useTranslations()
  const { query } = useRouter()
  const { currency } = useCurrencyStore()

  const { data } = useQuery({
    queryKey: ['bookings-detail'],
    queryFn: () => getBookingsItem(query.bookingId as any),
    enabled: Boolean(Number(query.bookingId)),
  })

  const total = data?.total && currency ? data.total / currency.rate : 0

  return (
    <div className="flex flex-col py-5 md:px-6">
      <h2 className="mb-2 text-base font-semibold text-primary-dark md:text-[18px] md:font-bold">
        {t('booking.payment-info')}
      </h2>

      <ul className="flex flex-col gap-1 text-[14px] text-primary-dark">
        <li className="flex items-center justify-between">
          <span>{t('booking.room_count', { count: 2 })}:</span>
          <span className="font-semibold">
            {formatNumber(total)} {currency?.short_name}
          </span>
        </li>
        {/* <li className="flex items-center justify-between">
          <span>{t('booking.tax', { tax: 10 })}</span>
          <span className="font-semibold">
            {formatNumber(total * 0.1)} {currency?.short_name}
          </span>
        </li> */}
        {/* <li className="flex items-center justify-between">
          <span>{t('booking.gov-tax', { tax: 2 })}</span>
          <span className="font-semibold">
            {formatNumber(total * 0.02)} {currency?.short_name}
          </span>
        </li> */}
        <li className="flex items-center justify-between">
          <span className="text-[16px] font-medium">{t('booking.total')}:</span>
          <span className="text-base font-semibold md:text-[18px]">
            {formatNumber(total)} {currency?.short_name}
          </span>
        </li>
      </ul>
    </div>
  )
}

export default DetailsPriceInformation
