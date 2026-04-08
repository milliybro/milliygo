import dayjs from 'dayjs'
import queryString from 'query-string'
import { Button, Divider } from 'antd'
import { useRouter } from 'next/router'
import { useTranslations } from 'next-intl'
import { ClockCircleOutlined } from '@ant-design/icons'

import useCurrencyStore from '@/store/currency'
import { formatNumber } from '@/helpers/number-formatter'

import StatusBadge from './StatusBadge'
import LocationIcon from '@/components/icons/location'
import SpeedTrainIcon from '@/components/icons/speed-train'

import type { FC } from 'react'
import type { IRailwayOrderResponse } from '@/features/TrainsItem/types'

const TrainBookingCard: FC<IRailwayOrderResponse> = (props) => {
  const { pathname, push } = useRouter()
  const t = useTranslations()
  const { currency } = useCurrencyStore((state) => state)

  const price = props?.total_cost / (currency?.rate || 1)

  return (
    <div className="space-y-4 rounded-2xl border p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3 text-[14px]">
          <span className="text-secondary">{t('transport.order')}:</span>
          <span className="font-bold text-primary-dark">{props?.express_id}</span>
          <StatusBadge status={props?.status} />
        </div>
        <span className="text-[18px] font-bold">
          {formatNumber(price || 0)} {currency?.short_name}
        </span>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <span className="mb-2 font-medium text-primary">{props?.car?.trainSchemaType}</span>
          <span className="mb-2 font-medium text-secondary">
            {props?.car?.brand} <span className="font-bold text-black">{props?.train_number}</span>
          </span>
        </div>
        <div className="flex w-full justify-between gap-3">
          <div className="text-2xl font-medium text-primary-dark sm:text-[32px]">
            {props?.departure_time?.split(':').slice(0, 2).join(':')}
          </div>

          <div className="relative mt-[40px] hidden flex-1 px-8 sm:block">
            <div className="relative border-t-2 border-secondary-light">
              <div className="absolute -top-1.5 left-0 h-2 w-2 rounded-full bg-primary">
                <SpeedTrainIcon className="absolute -left-1.5 bottom-3 text-[24px] text-primary" />
              </div>
              <div className="absolute -top-1.5 right-0 h-2 w-2 rounded-full bg-primary">
                <LocationIcon className="absolute -right-2 bottom-3 text-[24px] text-primary" />
              </div>
              <div className="absolute -bottom-0.5 left-[50%] size-2 translate-x-[-50%] rounded-full bg-primary-dark"></div>
              <div className="-translate-x-1/4.5 absolute bottom-[-50px] left-1/2 rounded-xl bg-secondary-light p-2 text-start">
                <div className="flex items-center gap-2 text-[14px] text-secondary">
                  <ClockCircleOutlined /> {props?.timeinway?.split(':').slice(0, 2).join(':')}
                </div>
              </div>
            </div>
          </div>

          <div className="mb-6 text-2xl font-medium text-primary-dark sm:mb-0 sm:text-[32px]">
            {props?.arrival_time?.split(':').slice(0, 2).join(':')}
          </div>
        </div>
      </div>

      <div className="relative mb-[160px] mt-[60px] block flex-1 sm:hidden">
        <div className="relative border-t-2 border-secondary-light">
          <div className="absolute -top-1.5 left-0 h-2 w-2 rounded-full bg-primary">
            <SpeedTrainIcon className="absolute -left-1.5 bottom-3 text-[24px] text-primary" />
          </div>
          <div className="absolute -top-1.5 right-0 h-2 w-2 rounded-full bg-primary">
            <LocationIcon className="absolute -right-2 bottom-3 text-[24px] text-primary" />
          </div>
          <div className="absolute -bottom-0.5 left-[50%] size-2 translate-x-[-50%] rounded-full bg-primary-dark"></div>
          <div className="absolute bottom-[-50px] left-1/2 -translate-x-1/2 rounded-xl bg-secondary-light p-2 text-start">
            <div className="flex items-center gap-2 text-[14px] text-secondary">
              <ClockCircleOutlined /> {props?.timeinway?.split(':').slice(0, 2).join(':')}
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between !pt-10 md:!pt-0">
        <div className="flex flex-col">
          <span className="text-[18px] font-medium text-primary-dark">
            {props?.station_from?.name}
          </span>
          <span className="text-sm text-gray-500">
            {props?.arrival_date
              ? dayjs(props?.arrival_date, 'YYYY-MM-DD').format('dd, D MMM')
              : null}
          </span>
        </div>

        <div className="flex flex-col">
          <span className="text-[18px] font-medium text-primary-dark">
            {props?.station_to?.name}
          </span>
          <span className="text-sm text-gray-500">
            {dayjs(props?.departure_date, 'YYYY-MM-DD').format('dd, D MMM')}
          </span>
        </div>
      </div>

      <Divider />
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1.5">
          <div className="rounded-lg bg-primary-light px-4 py-2 text-[14px] font-medium">
            {t('transport.carriage')}: {props?.car?.number}
          </div>
          {props?.passengers.map((passenger) => (
            <div
              key={passenger?.seats}
              className="rounded-lg bg-secondary-light px-4 py-2 text-[14px] font-medium"
            >
              {t('transport.seat')}: {parseFloat(passenger?.seats)}
            </div>
          ))}
        </div>
        <Button
          type="primary"
          onClick={() => push({ pathname, query: queryString.stringify({ id: props?.id }) })}
        >
          {t('transport.show-detailed')}
        </Button>
      </div>
    </div>
  )
}

export default TrainBookingCard
