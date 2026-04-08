import { Button, Modal, ModalProps, Typography } from 'antd'
import { useQuery } from '@tanstack/react-query'
import { getBusTicketDetail } from '../api'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { getTranslatedProperty } from '@/features/Main/containers/Intro/helpers/getTranslatedProperty'
import { useRouter } from 'next/router'
import dayjs from 'dayjs'
import { formatNumber } from '@/helpers/number-formatter'
import usePdfGenerator from '@/hooks/usePdfGenerator'
import { useMemo } from 'react'

interface IProps extends ModalProps {
  tripId: number
}

export default function BusTicketModal({ tripId, ...rest }: IProps) {
  const t = useTranslations()
  const { locale } = useRouter()
  const { contentRef, generatePdf, isLoading } = usePdfGenerator('bus-ticket-emehmon' + tripId)

  const { data: order, isFetching } = useQuery({
    queryKey: ['bus-ticket-detail', tripId, rest.open],
    queryFn: () => getBusTicketDetail(tripId),
    enabled: !!tripId && rest.open,
  })

  const ticketInfoList = useMemo(
    () => [
      {
        label: t('transport.trip_number'),
        value: order?.trip_id,
      },
      {
        label: t('transport.departure_station'),
        value: order?.[getTranslatedProperty('station_from', locale || 'uz')],
      },
      {
        label: t('transport.arrival_station'),
        value: order?.[getTranslatedProperty('station_to', locale || 'uz')],
      },
      {
        label: t('transport.departure_time'),
        value: dayjs(order?.departure_time).format('DD.MM.YY HH:mm'),
      },
      {
        label: t('transport.arrival_time'),
        value: dayjs(order?.arrival_time).format('DD.MM.YY HH:mm'),
      },
      {
        label: t('transport.bus_seat_number'),
        value: order?.seat_number,
      },
      {
        label: t('booking.client-placement'),
        value: order?.full_name,
      },
      {
        label: t('transport.purchase_time'),
        value: dayjs(order?.created_at).format('DD.MM.YYYY HH:mm'),
      },
      {
        label: t('avia.ticket_price'),
        value: formatNumber(order?.amount) + ' UZS',
      },
    ],
    [order, locale, t]
  )

  return (
    <Modal {...rest} footer={null} classNames={{ content: 'px-4' }} loading={isFetching}>
      <Typography.Title level={3} className="pt-5 text-center text-[32px] font-bold">
        {t('booking.confirmation')}
      </Typography.Title>
      <div className="flex flex-col gap-4 p-4" ref={contentRef}>
        <div>
          <Typography.Title level={4} className="mb-0 text-center text-sm font-semibold">
            {t('transport.trip_name')}:{' '}
            {order?.[getTranslatedProperty('route_name', locale || 'uz')]}
          </Typography.Title>
          <Typography.Title level={4} className="mb-0 text-center text-sm font-semibold">
            {t('transport.ticket_number')}: {order?.order_id}
          </Typography.Title>
        </div>
        <Image
          src={order?.qr || ''}
          alt="asd"
          height={150}
          width={150}
          className="h-[150px] w-auto self-center object-contain"
          draggable={false}
          unoptimized
        />
        <div className="flex flex-col gap-2">
          {ticketInfoList?.map((item, i) => (
            <div className="flex w-full items-center justify-between" key={i}>
              <span className="text-secondary">{item?.label}</span>
              <span className="font-semibold">{item?.value}</span>
            </div>
          ))}
          {/* <div className="w-full flex items-center justify-between">
            <span>Reys raqami:</span>
            <span>{order?.trip_id}</span>
          </div>
          <div className="w-full flex items-center justify-between">
            <span>Jo'nash stansiyasi:</span>
            <span>{order?.[getTranslatedProperty('station_from', locale || 'uz')]}</span>
          </div>
          <div className="w-full flex items-center justify-between">
            <span>Borish stansiyasi</span>
            <span>{order?.[getTranslatedProperty('station_to', locale || 'uz')]}</span>
          </div>
          <div className="w-full flex items-center justify-between">
            <span>Jo'nash stansiyasi:</span>
            <span>{order?.[getTranslatedProperty('station_from', locale || 'uz')]}</span>
          </div>
          <div className="w-full flex items-center justify-between">
            <span>Jo'nash vaqti:</span>
            <span>{dayjs(order?.departure_time).format('DD.MM.YY HH:mm')}</span>
          </div>
          <div className="w-full flex items-center justify-between">
            <span>Avtobusdagi joy №:</span>
            <span>{order?.seat_number}</span>
          </div>
          <div className="w-full flex items-center justify-between">
            <span>Mijoz:</span>
            <span>{order?.full_name}</span>
          </div>
          <div className="w-full flex items-center justify-between">
            <span>Sotib olish vaqti:</span>
            <span>{dayjs(order?.created_at).format('DD.MM.YY HH:mm')}</span>
          </div>
          <div className="w-full flex items-center justify-between">
            <span>Chipta narxi:</span>
            <span>{formatNumber(order?.amount)} UZS</span>
          </div> */}
        </div>
      </div>
      <div className="flex items-center justify-center">
        <Button
          type="primary"
          loading={isLoading}
          onClick={generatePdf}
          size="large"
          className="mt-2"
        >
          {t('cultural-heritage.print-ticket')}
        </Button>
      </div>
    </Modal>
  )
}
