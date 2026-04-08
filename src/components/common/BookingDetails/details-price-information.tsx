import { formatNumber } from '@/helpers/number-formatter'
import useCurrencyStore from '@/store/currency'
import { useTranslations } from 'next-intl'

const DetailsPriceInformation = ({ data }: any) => {
  const t = useTranslations()
  const { currency } = useCurrencyStore()

  const total = data?.total && currency ? data.total / currency.rate : 0

  return (
    <div className="flex flex-col px-6 py-5">
      <h2 className="mb-2 text-[18px] font-bold text-primary-dark">{t('booking.payment-info')}</h2>

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
          <span className="text-[18px] font-semibold">
            {formatNumber(total)} {currency?.short_name}
          </span>
        </li>
      </ul>
    </div>
  )
}

export default DetailsPriceInformation
