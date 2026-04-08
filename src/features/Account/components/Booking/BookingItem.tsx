import BlurImage from '@/components/common/BlurImage'
import CustomModal from '@/components/common/CModal'
import ArrowRightUpIcon from '@/components/icons/arrow-right-up'
import HotelIcon from '@/components/icons/hotel'
import SuccessIcon from '@/components/icons/success-icon'
import BookingPopover from '@/features/Account/components/Booking/BookingPopover'
import { formatNumber } from '@/helpers/number-formatter'
import useCurrencyStore from '@/store/currency'
import { IBooking, IBookingsDetail } from '@/types'
import { Button, Divider, Flex, Typography } from 'antd'
import dayjs from 'dayjs'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/router'
import { useState } from 'react'

function BookingItem({
  booking,
  refetch,
  href,
}: {
  booking: IBooking | IBookingsDetail
  refetch: any
  href?: string
}) {
  const t = useTranslations()
  const { push, pathname } = useRouter()
  const [openModal, setOpenModal] = useState(false)
  const { currency }: any = useCurrencyStore((state) => state)

  const currentDate = dayjs()

  const statusKey = dayjs(booking.end_date).isBefore(currentDate)
    ? 4
    : typeof booking.status === 'number'
      ? booking.status
      : 0

  const statuses = [
    {
      key: 'confirmed',
      id: 1,
      title: t('booking.status.confirmed'),
      color: '#4DD2821F',
      text: '#4DD282',
    },
    {
      key: 'unknown',
      id: 2,
      title: t('booking.status.unknown'),
      color: '#FFC1071F',
      text: '#000',
    },
    {
      key: 'cancelled',
      id: 3,
      title: t('booking.status.cancelled'),
      color: '#FF4E4E1F',
      text: '#FF4E4E',
    },
    {
      key: 'done',
      id: 4,
      title: t('booking.status.done'),
      color: '#E0E0E0',
      text: '#333',
    },
    {
      key: 'pay_on_arrival',
      id: 7,
      title: t('booking.status.pay_on_arrival'),
      color: '#FFD7001F',
      text: '#FFD700',
    },
  ]

  return (
    <Flex className="grid grid-cols-1 gap-4 sm:grid-cols-[max-content_4fr] lg:grid-cols-[max-content_4fr_2fr]">
      <BlurImage
        unoptimized
        width={108}
        height={108}
        alt="lorem"
        className="h-[108px] w-[108px] rounded-2xl object-cover"
        src={booking?.placement?.image}
        fallbackEl={
          <HotelIcon className="flex size-[108px] items-center justify-center rounded-2xl bg-secondary/10 text-[32px] text-secondary/60" />
        }
      />

      <Flex vertical className="justify-between">
        <Flex className="mb-2 flex items-center gap-3">
          <Typography.Title level={4} className="m-0">
            {booking?.placement?.name}
          </Typography.Title>

          <Typography
            className="rounded-xl px-[8px] py-[4px] text-[12px] font-medium"
            style={{
              backgroundColor:
                statuses.find((status) => status.id === statusKey)?.color || 'transparent',
              color: statuses.find((status) => status.id === statusKey)?.text || '#000',
            }}
          >
            <div className="w-max">{statuses.find((status) => status.id === statusKey)?.title}</div>
          </Typography>
        </Flex>

        <Typography className="line-clamp-2 h-[43px] overflow-hidden text-sm text-secondary">
          {booking?.placement?.description}
        </Typography>

        <Button
          aria-label={t('booking.view-details')}
          type="link"
          className="m-0 flex h-auto w-max items-center p-0 font-medium"
          onClick={() => push((href ? href : pathname) + '/' + booking?.id)}
        >
          {t('booking.view-details')}
          <ArrowRightUpIcon />
        </Button>
      </Flex>

      <Flex className="col-span-full h-max items-center justify-end gap-4 lg:col-span-1">
        <Typography.Title level={4} className="notranslate m-0 h-max font-bold">
          {formatNumber(booking?.total / currency.rate)} {currency.short_name}
        </Typography.Title>

        {statusKey !== 3 && (
          <BookingPopover status={statusKey} booking={booking} refetch={refetch} />
        )}
      </Flex>

      <CustomModal
        width={640}
        modalIcon={<HotelIcon className="text-[40px]" />}
        modalTitle={t('booking.view-details')}
        modalDesc={t('booking.here-details')}
        open={openModal}
        onOk={() => setOpenModal(false)}
        onCancel={() => setOpenModal(false)}
      >
        <Flex vertical>
          <Flex vertical>
            <Flex className="items-center justify-between rounded-[8px] bg-[#F8F8FA] p-[8px_16px]">
              <Typography className="font-semibold">{t('booking.title')}</Typography>
              <Flex>
                <Typography className="ml-2">{t('booking.total-price')}</Typography>

                <Typography className="ml-2 font-bold">
                  {formatNumber(booking?.total)} UZS
                </Typography>
              </Flex>
            </Flex>

            <Flex className="grid grid-cols-2 pt-[16px]">
              <Flex vertical className="p-[16px] pt-0">
                <Typography>{t('user.check-in')}</Typography>
                <Typography className="font-semibold">
                  {dayjs(booking.start_date).format('DD MMM YYYY')}
                </Typography>
                <Typography>
                  {t('user.dan', { time: dayjs(booking.start_date).format('HH:mm') })}
                </Typography>
              </Flex>

              <Flex vertical className="border-l border-solid border-[#05050506] p-[16px] pt-0">
                <Typography>{t('user.check-out')}</Typography>
                <Typography className="font-semibold">
                  {dayjs(booking.end_date).format('DD MMM YYYY')}
                </Typography>
                <Typography>
                  {t('user.gacha', { time: dayjs(booking.end_date).format('HH:mm') })}
                </Typography>
              </Flex>
            </Flex>
          </Flex>

          <Divider className="mb-[32px] mt-[16px] text-[#B7BFD5]" />

          <Flex vertical gap={24}>
            <Typography className="font-semibold">{t('booking.your-arrival-time')}</Typography>
            <Flex vertical gap={16}>
              <Flex className="items-center">
                <SuccessIcon className="text-[#4DD282]" />
                <Typography className="ml-2">
                  {t('booking.your-arrival-time-description')}
                </Typography>
              </Flex>
              <Flex className="items-center">
                <SuccessIcon className="text-[#4DD282]" />
                <Typography className="ml-2">
                  {t('booking.your-arrival-time-description-2')}
                </Typography>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </CustomModal>
    </Flex>
  )
}

export default BookingItem
