import { Button, Card, Divider, Flex, Image, Tag } from 'antd'
import dayjs from 'dayjs'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

import { formatNumber } from '@/helpers/number-formatter'
import TimelineOrder from './TimeLine'

function AviaorderCardRound({ data }: { data: any }) {
  const t = useTranslations()

  const [selectedOutboundIndex, _setSelectedOutboundIndex] = useState(0)
  const [selectedInboundIndex, _setSelectedInboundIndex] = useState(0)

  const outbounds = data?.flights || []
  const inbounds = data?.flights_rt || []

  const outbound = outbounds[selectedOutboundIndex]
  const inbound = inbounds[selectedInboundIndex]

  const totalFare =
    outbound?.fare && inbound?.fare
      ? {
          price: outbound.fare.price + inbound.fare.price,
          currency: outbound.fare.currency || inbound.fare.currency,
          seatLeft: Math.min(outbound.fare.seat_left, inbound.fare.seat_left),
        }
      : null

  if (!outbound || !inbound) {
    return null
  }
  const statusColors: Record<string, string> = {
    CANCEL: 'red',
    BRON: 'blue',
    ERROR: 'red',
    PAID: 'green',
  }

  return (
    <Card className="relative rounded-[16px] bg-white p-0">
      {outbound.logo && (
        <Image
          preview={false}
          src={outbound?.logo}
          alt="airline-logo"
          width={200}
          height={60}
          className="ms-0"
        />
      )}

      <div className="flex items-start justify-between gap-6">
        <div>
          <h4 className="pb-6 text-[32px] font-medium text-primary-dark">
            {dayjs(outbound?.dep_time, 'HH:mm:ss', true).isValid()
              ? dayjs(outbound?.dep_time, 'HH:mm:ss').format('HH:mm')
              : outbound?.dep_time?.slice(0, 5)}
          </h4>
          <p className="text-lg font-medium text-primary-dark">{outbound?.dep_airport?.city}</p>
          <p className="w-[150px] text-sm text-secondary">
            {dayjs(outbound?.dep_date).format('dd, D MMMM YYYY')}
          </p>
        </div>
        <TimelineOrder destination={[outbound]} />
        <div className="flex flex-col items-end">
          <h4 className="pb-6 text-[32px] font-medium text-primary-dark">
            {' '}
            {dayjs(outbound?.arr_time, 'HH:mm:ss', true).isValid()
              ? dayjs(outbound?.arr_time, 'HH:mm:ss').format('HH:mm')
              : outbound?.arr_time?.slice(0, 5)}
          </h4>
          <p className="text-end text-[18px] font-medium text-primary-dark">
            {outbound?.arr_airport?.city}
          </p>
          <p className="w-[150px] text-end text-sm text-secondary">
            {dayjs(outbound?.arr_date).format('dd, D MMMM YYYY')}
          </p>
        </div>
      </div>
      <Divider className="my-4" />

      <div className="flex items-start justify-between gap-6">
        <div>
          <h4 className="pb-6 text-[32px] font-medium text-primary-dark">
            {' '}
            {dayjs(inbound?.dep_time, 'HH:mm:ss', true).isValid()
              ? dayjs(inbound?.dep_time, 'HH:mm:ss').format('HH:mm')
              : inbound?.dep_time?.slice(0, 5)}
          </h4>
          <p className="text-lg font-medium text-primary-dark">{inbound?.dep_airport?.city}</p>
          <p className="w-[150px] text-sm text-secondary">
            {dayjs(inbound?.dep_date).format('dd, D MMMM YYYY')}
          </p>
        </div>
        <TimelineOrder destination={[inbound]} />
        <div className="flex flex-col items-end">
          <h4 className="pb-6 text-[32px] font-medium text-primary-dark">
            {' '}
            {dayjs(inbound?.arr_time, 'HH:mm:ss', true).isValid()
              ? dayjs(inbound?.arr_time, 'HH:mm:ss').format('HH:mm')
              : inbound?.arr_time?.slice(0, 5)}
          </h4>
          <p className="text-end text-[18px] font-medium text-primary-dark">
            {inbound?.arr_airport?.city}
          </p>
          <p className="w-[150px] text-end text-sm text-secondary">
            {dayjs(inbound?.arr_date).format('dd, D MMMM YYYY')}
          </p>
        </div>
      </div>
      <Divider className="my-4" />

      <Flex className="items-center justify-between">
        <div className="flex flex-col gap-2">
          {totalFare && (
            <>
              <p className="text-base font-semibold text-primary-dark">
                {formatNumber(totalFare.price)} {totalFare.currency}
              </p>
            </>
          )}
        </div>
        <div className="flex items-center gap-4">
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

export default AviaorderCardRound
