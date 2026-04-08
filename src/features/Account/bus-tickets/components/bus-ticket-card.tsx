import { Button, Divider, Typography } from 'antd'
import dayjs from 'dayjs'
import { useTranslations } from 'next-intl'

import BusIcon3 from '@/components/icons/bus-icon3'
import LocationIcon from '@/components/icons/location'
import { formatNumber } from '@/helpers/number-formatter'
import useCurrencyStore from '@/store/currency'
import { useMemo } from 'react'
import { IBusTicketInfo } from '../types'

function BusTicketCard({
  trip,
  onPrint,
}: {
  trip: IBusTicketInfo
  onPrint: (_id: number) => void
}) {
  const t = useTranslations('')
  const { convertCurrency, currency } = useCurrencyStore()

  const departure = dayjs(trip?.departure_time)
  const arrival = dayjs(trip?.arrival_time)

  const durationDisplay = useMemo(() => {
    const duration = arrival.diff(departure, 'minutes')
    return `${Math.floor(duration / 60)
      .toString()
      .padStart(2, '0')}:${(duration % 60).toString().padStart(2, '0')}`
  }, [departure, arrival])

  const plateNumber = trip?.bus_number?.replaceAll(' ', '')

  const formattedLicensePlate =
    plateNumber?.slice(0, 2) +
    ' ' +
    (!isNaN(+plateNumber[2])
      ? plateNumber?.slice(2, 5) + ' ' + plateNumber?.slice(5, 8)
      : plateNumber?.slice(2, 3) + ' ' + plateNumber?.slice(3, 6) + ' ' + plateNumber?.slice(6, 8))

  const cardInfoRow = useMemo(
    () => [
      { label: t('transport.number-of-tickets'), value: 1 },
      {
        label: t('avia.seats_info', { count: trip?.seat_number || 0 }),
        value: trip?.seat_number || 'N/A',
      },
      { label: t('transport.bus-number'), value: formattedLicensePlate || 'N/A' },
      {
        label: t('transport.ticket-price'),
        value:
          formatNumber(convertCurrency(trip?.amount) || 0) + ` ${currency?.short_name || ''}` ||
          'N/A',
      },
      { label: t('transport.order-number'), value: '№' + trip?.order_id || 'N/A' },
    ],
    [trip]
  )

  return (
    <>
      <div className="flex flex-col gap-3 rounded-[16px] border bg-white p-6">
        <div className="flex grow items-start justify-between sm:hidden">
          <div className="flex flex-col items-center gap-3">
            <BusIcon3 className="text-xl text-primary" />
            <div className="h-2 w-2 rounded-full bg-primary" />
          </div>
          <Typography.Text className="text-lg font-medium">{durationDisplay}</Typography.Text>
          <div className="flex flex-col items-center gap-3">
            <LocationIcon className="text-xl text-primary" />
            <div className="h-2 w-2 rounded-full bg-primary" />
          </div>
        </div>
        <div className="flex w-full items-center justify-between gap-8 sm:justify-normal">
          <div className="flex flex-col">
            <Typography.Text className="text-[32px] font-medium">
              {departure.format('HH:mm')}
            </Typography.Text>
            <Typography.Text className="text-lg font-medium">{trip?.station_from}</Typography.Text>
            <Typography.Text className="text-sm font-medium text-secondary">
              {departure.format('dd, DD MMM')}
            </Typography.Text>
          </div>
          <div className="hidden grow items-start justify-between sm:flex">
            <div className="flex flex-col items-center gap-3">
              <BusIcon3 className="text-xl text-primary" />
              <div className="h-2 w-2 rounded-full bg-primary" />
            </div>
            <Typography.Text className="text-lg font-medium">{durationDisplay}</Typography.Text>
            <div className="flex flex-col items-center gap-3">
              <LocationIcon className="text-xl text-primary" />
              <div className="h-2 w-2 rounded-full bg-primary" />
            </div>
          </div>
          <div className="flex flex-col text-right">
            <Typography.Text className="text-[32px] font-medium">
              {arrival.format('HH:mm')}
            </Typography.Text>
            <Typography.Text className="text-lg font-medium">{trip?.station_to}</Typography.Text>
            <Typography.Text className="text-sm font-medium text-secondary">
              {arrival.format('dd, DD MMM')}
            </Typography.Text>
          </div>
        </div>
        <Divider className="m-0" />
        <div className="flex flex-wrap items-center gap-2">
          {cardInfoRow?.map((card, i) => (
            <div key={i} className="flex flex-col gap-2 p-2">
              <span className="text-base font-semibold">{card?.value}</span>
              <span className="text-sm text-secondary">{card?.label}</span>
            </div>
          ))}
        </div>
        <Divider className="m-0" />
        <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <Typography.Text className="mb-2 block text-sm text-secondary">
              {t('transport.total-amount')}
            </Typography.Text>
            <Typography.Text className="block text-xl font-semibold lowercase text-black">
              {formatNumber(convertCurrency(trip?.amount) || 0) + ` ${currency?.short_name || ''}`}
            </Typography.Text>
          </div>
          <Button type="primary" onClick={() => onPrint(trip?.id)}>
            {t('others.print')}
          </Button>
        </div>
      </div>
    </>
  )
}

export default BusTicketCard
