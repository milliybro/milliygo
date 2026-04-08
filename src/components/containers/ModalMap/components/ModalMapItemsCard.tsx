/* eslint-disable @next/next/no-img-element */
import { Button, Card, Flex, Typography } from 'antd'
import { useTranslations } from 'next-intl'
import { memo, useEffect, useState } from 'react'
import { useMutation } from '@tanstack/react-query'

import isDateActive from '@/helpers/is-date-active'
import { formatNumber } from '@/helpers/number-formatter'
import useCurrencyStore from '@/store/currency'

import CRate from '@/components/common/CRate'
import RateTag from '@/components/common/RateTag'

import { postFavorite } from '@/features/HotelsItem/api'

import BlurImage from '@/components/common/BlurImage'
import FavoriteFilledIcon from '@/components/icons/favorite-filled'
import type { Placement } from '@/types'
import { useRouter } from 'next/router'
import queryString from 'query-string'
import type { FC } from 'react'

interface IProps extends Placement {
  selectedPoint: number | null
  placement_id?: number

  star_rating?: number
  min_price: number
  onCancel?: Function
  hotelsList?: string
  placement_slug?: string
  images_list?: any
}

const ModalMapItemsCard: FC<IProps> = ({
  id,
  placement_id,
  name,
  placement_name,
  discount,
  min_price,
  avg_rating,
  is_favorite,
  selectedPoint,
  discount_end_date,
  discount_start_date,
  star_rating,
  hotelsList,
  placement_slug,
  images_list,
}) => {
  const t = useTranslations('buttons')
  const isDiscountActive = isDateActive(discount_start_date, discount_end_date)
  const { currency }: any = useCurrencyStore((state) => state)
  const { push, query } = useRouter()

  const [isFavorite, setIsFavorite] = useState(false)
  const { mutate } = useMutation({
    mutationFn: postFavorite,
    onSuccess: () => {
      setIsFavorite((prev) => !prev)
    },
    onError: () => {
      setIsFavorite(isFavorite)
    },
  })

  const favoriteHandler = () => {
    mutate({ placement: placement_id || (placement_id as number) })
  }

  const clickHandler = () => {
    push({ pathname: `/hotels/${placement_slug}`, query: queryString.stringify(query) })
  }

  useEffect(() => {
    if (is_favorite) {
      setIsFavorite(is_favorite)
    }
  }, [is_favorite])

  return (
    <Card
      className={`group w-[230px] overflow-hidden rounded-[16px] border duration-200 hover:border-active ${
        selectedPoint === id ? 'border-active' : 'border-transparent'
      }`}
      hoverable
      style={{ padding: '0' }}
      classNames={{ body: 'p-0' }}
    >
      <div className="relative h-[120px] w-full overflow-hidden">
        {/* <Image
          src={placement_image || `${process.env.NEXT_PUBLIC_BASE_URL}/${image}`}
          width={200}
          height={120}
          alt="banner"
          className="object-cover h-full w-full object-top"
        /> */}

        <BlurImage
          src={images_list?.[0]?.image}
          fallbackSrc="/logo.svg"
          width={200}
          height={120}
          alt="banner"
          className="h-full w-full cursor-pointer object-cover"
        />
        <div className="notranslate">
          <RateTag value={avg_rating?.toFixed(1)} className="absolute left-2 top-2" />
        </div>
        <Button
          aria-label="add to favorite"
          type="text"
          className={`absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-lg bg-secondary-light duration-200 hover:stroke-danger hover:text-danger ${
            isFavorite ? 'stroke-danger text-danger' : 'stroke-secondary/50 text-transparent'
          }`}
          onClick={favoriteHandler}
        >
          <div className="flex items-center">
            <FavoriteFilledIcon />
          </div>
        </Button>
      </div>
      <Flex vertical className="p-4">
        <CRate disabled allowHalf defaultValue={star_rating} />
        <Typography.Title level={5} className="notranslate">
          {placement_name || name}
        </Typography.Title>
        {isDiscountActive ? (
          <Typography.Text delete className="notranslate text-sm text-secondary">
            {formatNumber(min_price / currency?.rate)} {currency?.short_name}
          </Typography.Text>
        ) : null}
        <Flex align="center" className="mb-2">
          <Typography.Title className="notranslate m-0" level={4}>
            {isDiscountActive
              ? formatNumber((min_price - (min_price * discount) / 100) / currency.rate)
              : formatNumber(min_price / currency?.rate)}{' '}
            {currency?.short_name}
          </Typography.Title>
          {/* <Popover
            placement="bottomLeft"
            trigger="hover"
            className="h-4"
            content={
              <Flex vertical className="w-[380px]">
                <Flex justify="space-between" align="center">
                  <Flex vertical>
                    <Typography.Text className="text-sm">
                      805 400 {currency?.short_name}
                    </Typography.Text>
                    <Typography.Text className=" text-xs text-secondary">× 3 ночи</Typography.Text>
                  </Flex>
                  <Typography.Text className="text-sm">
                    2 415 000 {currency?.short_name}
                  </Typography.Text>
                </Flex>
                <Divider className="my-2" />
                <Flex justify="space-between" align="center">
                  <Flex vertical>
                    <Typography.Text className="text-sm">
                      Предложение “{discount_name}”
                    </Typography.Text>
                    <Typography.Text className=" text-xs text-secondary">
                      Дешевле на 12%
                    </Typography.Text>
                  </Flex>
                  <Typography.Text className="text-sm">
                    289 900 {currency?.short_name}
                  </Typography.Text>
                </Flex>
                <Divider className=" mt-2 mb-3" />
                <Flex justify="space-between">
                  <Typography.Text className=" font-medium text-base">Итого</Typography.Text>
                  <Typography.Text className=" font-medium text-base">
                    2 890 000 {currency?.short_name}
                  </Typography.Text>
                </Flex>
              </Flex>
            }
          >
            <Button type="text" shape="round" className="flex justify-center  p-2 items-center">
              <InfoSquareIcon className="text-secondary w-3 h-3" />
            </Button>
          </Popover> */}
        </Flex>
        <Button
          aria-label={hotelsList && hotelsList.length === 1 ? t('book') : t('view-the-place')}
          size="middle"
          type="primary"
          onClick={clickHandler}
          className={`w-full group-hover:bg-active ${selectedPoint === id ? 'bg-active' : ''}`}
        >
          {hotelsList && hotelsList.length === 1 ? t('book') : t('view-the-place')}
        </Button>
      </Flex>
    </Card>
  )
}

export default memo(ModalMapItemsCard)
