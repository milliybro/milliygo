import { Flex, Typography } from 'antd'

import useCurrencyStore from '@/store/currency'

import { formatNumber } from '@/helpers/number-formatter'

import RateTag from './RateTag'

import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import type { FC } from 'react'
import HotelIconBtn from '../icons/hotel-icon-btn'

const BookHotelCard: FC<any> = ({
  images_list,
  name,
  address,
  avg_rating,
  price,
  placement_slug,
}) => {
  const { currency } = useCurrencyStore((state) => state)
  const t = useTranslations()

  const minPrice = price / (currency?.rate || 1)

  return (
    <Link href={`/hotels/${placement_slug}`} aria-label={`open ${placement_slug} route`}>
      <div className="flex cursor-pointer flex-col">
        <div className="relative mb-3 overflow-hidden rounded-[20px]">
          <Flex className="absolute left-0 top-0 w-full p-[12px]" justify="end">
            <Flex vertical gap={4} className="grow">
              {/* {breakfast === 1 && (
                <Tag className="bg-active border-none w-fit text-white h-[22px] flex items-center px-2 rounded-lg">
                  {t('buttons.breakfast-included')}
                </Tag>
              )} */}
              {/* {isDiscountActive && (
                <Tag className="bg-warn border-none w-fit text-white h-[22px] flex items-center px-2 rounded-lg">
                  {t('hotels.discount')} {placement_discount}%
                </Tag>
              )} */}
              {/* <Tag className="bg-primary border-none w-fit text-white h-[22px] flex items-center px-2 rounded-lg">
              Рекомендуем
            </Tag>
            <Tag className="bg-[#B7BFD5] border-none w-fit text-white h-[22px] flex items-center px-2 rounded-lg">
              Сезонное предложение
            </Tag> */}
            </Flex>
            {avg_rating ? <RateTag value={avg_rating?.toFixed(1)} /> : null}
          </Flex>
          <div className="h-[282px] w-[282px] dxs:w-full">
            {images_list[0] ? (
              <Image
                unoptimized
                src={images_list[0]?.image}
                width={282}
                height={282}
                alt="hotel image"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full justify-center bg-gray-300">
                <HotelIconBtn className="text-6xl" />
              </div>
            )}
          </div>
        </div>
        <Flex vertical className="flex-1">
          <Typography.Title level={5} className="mb-1 line-clamp-1">
            {name}
          </Typography.Title>
          <div className="flex-1">
            <Typography.Text className="mb-3 line-clamp-1 text-sm">{address}</Typography.Text>
          </div>
          <Flex justify="space-between" align="center">
            <span className="text-base font-bold leading-[140%] text-primary">
              <span className="notranslate">
                {t('user.dan', { time: `${formatNumber(minPrice) || 0} ` })}{' '}
                <span>{currency?.short_name}</span>
              </span>
              <span className="text-xs font-normal text-secondary">/{t('preferences.night')}</span>
            </span>
          </Flex>
        </Flex>
      </div>
    </Link>
  )
}

export default BookHotelCard
