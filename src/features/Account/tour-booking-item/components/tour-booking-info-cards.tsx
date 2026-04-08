import SuccessIcon from '@/components/icons/success-icon'
import { formatNumber } from '@/helpers/number-formatter'
import useCurrencyStore from '@/store/currency'
import { Divider } from 'antd'
import dayjs from 'dayjs'
import parsePhoneNumber from 'libphonenumber-js'
import { FC } from 'react'
import { ITourAgentOrderItem, ITourAgentPaymentStatus } from '../types'
import {
  ClockCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons'
import WarningIcon from '@/components/icons/warningIcon'
import { twMerge } from 'tailwind-merge'
import { useTranslations } from 'next-intl'

interface TourBookingInfoCardsProps {
  order: ITourAgentOrderItem | undefined
}

const paymentStatuses: Record<
  ITourAgentPaymentStatus,
  { text: string; colorClass: string; icon?: FC<any> }
> = {
  awaiting_payment: {
    text: 'Ожидает оплаты',
    colorClass: 'text-yellow-500',
    icon: ClockCircleOutlined,
  },
  payment_unconfirmed: {
    text: 'Оплата не подтверждена',
    colorClass: 'text-orange-500',
    icon: WarningIcon,
  },
  payment_confirmed: { text: 'Оплачено', colorClass: 'text-green-600', icon: SuccessIcon },
  payment_refunded: {
    text: 'Оплата возвращена',
    colorClass: 'text-blue-500',
    icon: ExclamationCircleOutlined,
  },
  payment_not_refunded: {
    text: 'Оплата не возвращена',
    colorClass: 'text-red-500',
    icon: CloseCircleOutlined,
  },
}

export default function TourBookingInfoCards({ order }: TourBookingInfoCardsProps) {
  const { currency, convertCurrency } = useCurrencyStore()
  const t = useTranslations()

  const paymentDisplay = paymentStatuses?.['payment_confirmed']

  return (
    <>
      <div className="grid grid-cols-1 gap-y-6 rounded-2xl bg-secondary/10 px-6 py-4 text-sm sm:grid-cols-3 md:grid-cols-4">
        <div className="flex">
          <div className="w-full space-y-3 text-center">
            <div className="text-secondary">{t('tours.tour-agency')}</div>
            <div className="font-semibold">{order?.tour_agent?.brand_name}</div>
          </div>
          <div className="mx-2 hidden w-px bg-secondary/20 sm:block" />
        </div>
        <div className="flex">
          <div className="w-full space-y-3 text-center">
            <div className="text-secondary">{t('tours.phone')}</div>
            <div className="font-semibold">
              {parsePhoneNumber(order?.tour_agent?.phone_number || '', 'UZ')?.format(
                'INTERNATIONAL'
              )}
            </div>
          </div>
          <div className="mx-2 hidden w-px bg-secondary/20 sm:block" />
        </div>
        <div className="flex">
          <div className="w-full space-y-3 text-center">
            <div className="text-secondary">{t('tours.start-tour')}</div>
            <div className="font-semibold">
              {dayjs(order?.tour?.start_date).format('DD MMMM YYYY')}
            </div>
          </div>
          <div className="mx-2 hidden w-px bg-secondary/20 md:block" />
        </div>
        <div className="flex">
          <div className="w-full space-y-3 text-center">
            <div className="text-secondary">{t('tours.end-tour')}</div>
            <div className="font-semibold">
              {dayjs(order?.tour?.end_date).format('DD MMMM YYYY')}
            </div>
          </div>
        </div>
      </div>
      <Divider className="m-0" />
      <div className="grid grid-cols-1 gap-y-6 rounded-2xl bg-secondary/10 px-6 py-4 text-sm sm:grid-cols-3 md:grid-cols-4">
        <div className="flex">
          <div className="w-full space-y-3 text-center">
            <div className="text-secondary">{t('tours.sum')}</div>
            <div className="font-semibold lowercase">
              {formatNumber(convertCurrency(order?.tour?.price ?? 0) || 0)} {currency?.short_name}
            </div>
          </div>
          <div className="mx-2 hidden w-px bg-secondary/20 sm:block" />
        </div>
        <div className="flex">
          <div className="w-full space-y-3 text-center">
            <div className="text-secondary">{t('tours.status-pay')}</div>
            {paymentDisplay ? (
              <div
                className={twMerge(
                  'flex items-center justify-center gap-[6px] font-medium',
                  paymentDisplay.colorClass
                )}
              >
                {paymentDisplay.icon && <paymentDisplay.icon className="text-base text-inherit" />}
                {paymentDisplay.text}
              </div>
            ) : null}
          </div>
          <div className="mx-2 hidden w-px bg-secondary/20 sm:block" />
        </div>
        <div className="flex">
          <div className="w-full space-y-3 text-center">
            <div className="text-secondary">{t('tours.date-payment')}</div>
            <div className="font-semibold">-</div>
          </div>
          <div className="mx-2 hidden w-px bg-secondary/20 md:block" />
        </div>
        <div className="w-full space-y-3 text-center">
          <div className="text-secondary">{t('tours.person-count')}</div>
          <div className="font-semibold">{order?.participants_count}</div>
        </div>
      </div>
    </>
  )
}
