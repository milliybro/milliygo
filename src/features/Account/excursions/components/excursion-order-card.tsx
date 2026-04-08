import BlurImage from '@/components/common/BlurImage'
import ArrowRightUpIcon from '@/components/icons/arrow-right-up'
import RouteIcon from '@/components/icons/route-icon'
import { formatNumber } from '@/helpers/number-formatter'
import useCurrencyStore from '@/store/currency'
import { Button, Flex, Typography } from 'antd'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/router'
import TourOrderPopover from '../../tours/components/tour-order-popover'
import { IExcursionOrder } from '../types'

interface IProps {
  order: IExcursionOrder
}

export default function ExcursionOrderCard({ order }: IProps) {
  const t = useTranslations()
  const { push, pathname } = useRouter()
  const { convertCurrency, currency } = useCurrencyStore()
  const statuses = [
    {
      key: 'confirmed',
      id: 1,
      title: t('booking.status.confirmed'),
      color: '#4DD2821F',
      text: '#4DD282',
    },
    {
      key: 'pending',
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
      color: '#f2f2f2',
      text: '#333',
    },
  ]

  return (
    <Flex className="grid grid-cols-[max-content_4fr_2fr] gap-4">
      <BlurImage
        width={108}
        height={108}
        alt="lorem"
        className="h-[108px] w-[108px] rounded-2xl object-cover"
        src={order?.tour?.tour_first_image_url}
        fallbackEl={
          <div className="flex size-[108px] items-center justify-center bg-secondary-light">
            <RouteIcon className="text-2xl text-secondary" />
          </div>
        }
      />
      {/* <Image
        width={108}
        height={108}
        alt="lorem"
        className="rounded-2xl  object-cover h-[108px] w-[108px]"
        src={order?.tour?.tour_first_image_url}
      /> */}
      <Flex vertical className="justify-between">
        <Flex className="flex items-center gap-2">
          <Typography.Title level={5} className="m-0">
            {order?.excursion?.name}
          </Typography.Title>

          <Typography
            className="rounded-xl px-[8px] py-[4px]"
            style={{
              backgroundColor:
                statuses.find((status) => status.key === order?.status)?.color || 'transparent',
              color: statuses.find((status) => status.key === order?.status)?.text || '#000',
            }}
          >
            <div className="w-max">
              {statuses.find((status) => status.key === order?.status)?.title}
            </div>
          </Typography>
        </Flex>

        <Typography className="h-[23px] overflow-hidden">
          {order?.excursion?.description}
        </Typography>

        <Button
          aria-label={t('booking.view-details')}
          type="link"
          className="m-0 flex w-max items-center p-0"
          onClick={() => push(pathname + '/' + order?.id)}
        >
          {t('booking.view-details')}
          <ArrowRightUpIcon />
        </Button>
      </Flex>
      <Flex className="h-max items-center justify-end gap-4">
        <Typography.Title level={5} className="notranslate m-0 h-max">
          {formatNumber(convertCurrency(order?.tour?.price) || 0)} {currency?.short_name}
        </Typography.Title>
        <TourOrderPopover />
      </Flex>
    </Flex>
  )
}
