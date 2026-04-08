import { IDestination } from '@/features/FindAPlane/types'
import { formatNumber } from '@/helpers/number-formatter'
import { useMediaQuery } from '@/utils/useMediaQuery'
import { Button, Card, Divider, Flex, Tag } from 'antd'
import dayjs from 'dayjs'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import TimelineOrder from './TimeLine'

function AviaOrderCard({
  destination,
  data,
}: {
  destination: IDestination
  type?: string
  package_step?: string | string[]
  data: any
}) {
  const t = useTranslations()
  const isAverage = useMediaQuery('(max-width: 1024px)')

  const segments = Array.isArray(destination?.flights) ? destination.flights : [destination]

  const cheapestFare = segments[0]?.fare || null

  const statusColors: Record<string, string> = {
    CANCEL: 'red',
    BRON: 'blue',
    ERROR: 'red',
    PAID: 'green',
  }

  return (
    <Card className="relative rounded-[16px] bg-white p-0 sm:p-1">
      <div className="mb-4 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          {segments[0]?.logo && (
            <Image
              src={segments[0].logo}
              width={200}
              height={100}
              alt="airline-logo"
              className="ms-0"
              unoptimized
            />
          )}
        </div>

        {isAverage && (
          <div className="mb-4">
            <TimelineOrder destination={segments} />
          </div>
        )}

        <div className="flex cursor-pointer items-start justify-between gap-2 sm:gap-6">
          <div>
            <h4 className="pb-6 text-2xl font-medium text-primary-dark sm:text-[32px]">
              {dayjs(segments[0]?.dep_time, 'HH:mm:ss', true).isValid()
                ? dayjs(segments[0]?.dep_time, 'HH:mm:ss').format('HH:mm')
                : segments[0]?.dep_time?.slice(0, 5)}
            </h4>
            <p className="w-full text-sm font-medium text-primary-dark sm:w-[140px] sm:text-lg">
              {segments[0]?.dep_airport?.city}
            </p>
            <p className="text-xs font-medium capitalize text-secondary sm:text-sm">
              {segments[0]?.dep_date &&
                dayjs(segments[0]?.dep_date, 'YYYY-MM-DD')
                  .format('dd, D MMMM YYYY')
                  .replaceAll('.', '')}
            </p>
          </div>

          {!isAverage && <TimelineOrder destination={segments} />}

          <div className="flex flex-col items-end">
            <h4 className="pb-6 text-2xl font-medium text-primary-dark sm:text-[32px]">
              {dayjs(segments[segments.length - 1]?.arr_time, 'HH:mm:ss', true).isValid()
                ? dayjs(segments[segments.length - 1]?.arr_time, 'HH:mm:ss').format('HH:mm')
                : segments[segments.length - 1]?.arr_time?.slice(0, 5)}
            </h4>
            <p className="w-full text-end text-sm font-medium text-primary-dark sm:w-[140px] sm:text-[18px]">
              {segments[segments.length - 1]?.arr_airport?.city ||
                segments[segments.length - 1]?.arr_airport?.airport_name}
            </p>
            <p className="text-end text-xs font-medium capitalize text-secondary sm:text-[14px]">
              {segments[segments.length - 1]?.arr_date &&
                dayjs(segments[segments.length - 1]?.arr_date, 'YYYY-MM-DD')
                  .format('dd, D MMMM YYYY')
                  .replaceAll('.', '')}
            </p>
          </div>
        </div>
      </div>

      <Divider className="my-4" />

      <Flex className="flex-wrap items-center justify-between gap-3">
        <div className="flex flex-col gap-2">
          <p className="text-xs font-medium text-primary-dark">{t('avia.without_luggage')}</p>
          <p className="text-base font-semibold text-primary-dark">
            {formatNumber(+cheapestFare?.price)} {cheapestFare?.currency}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <Tag
            color={statusColors[data?.status] || 'default'}
            className="px-6 py-[10px] text-[16px]"
          >
            {data?.status}
          </Tag>
          <Button type="primary" onClick={() => {}}>
            {t('buttons.payment')}
          </Button>
        </div>
      </Flex>
    </Card>
  )
}

export default AviaOrderCard
