import { Button, Card, Carousel, Flex, Typography } from 'antd'
import { useRef } from 'react'
import { useMutation } from '@tanstack/react-query'

import { postFavorite } from '@/features/HotelsItem/api'

import BlurImage from '@/components/common/BlurImage'
import CRate from '@/components/common/CRate'

import ArrowLeftIcon2 from '@/components/icons/arrow-left-2'
import ArrowRightIcon2 from '@/components/icons/arrow-right-2'
import LocationIcon from '@/components/icons/location'
import StarIcon from '@/components/icons/star'

import FavoriteFilledIcon from '@/components/icons/favorite-filled'
import type { IFavoriteItem } from '@/types'
import type { CarouselRef } from 'antd/es/carousel'
import Link from 'next/link'
import type { CSSProperties, FC, MouseEventHandler } from 'react'

const contentStyle: CSSProperties = {
  margin: 0,
  height: '192px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
}

const FavoriteItem: FC<IFavoriteItem & { refetch: () => void }> = ({
  slug,
  avg_rating,
  star_rating,
  name: placement_name,
  address,
  refetch,
  images,
  id,
  description,
}) => {
  const slider = useRef<CarouselRef>(null)

  const { mutate } = useMutation({
    mutationFn: postFavorite,
    onSuccess: () => {
      refetch()
    },
  })

  const favoriteHandler: MouseEventHandler<HTMLElement> = (e) => {
    e.preventDefault()
    mutate({ placement: id })
  }

  return (
    <Card
      variant="borderless"
      className="overflow-hidden rounded-2xl border p-2"
      styles={{ body: { padding: 0 } }}
    >
      <Link href={`/hotels/${slug}`} aria-label={`open ${slug} route`}>
        <Flex gap={16} className="flex-col sm:flex-row">
          <div className="round relative h-[196px] min-w-[196px] max-w-[196px] overflow-hidden rounded-xl">
            <Carousel
              ref={slider}
              dots={false}
              draggable
              className="h-full overflow-hidden"
              rootClassName="custom-carousel"
            >
              {images?.map((val, i): any => (
                <div key={'found-hotels-items-images' + i} className="h-[196px] w-full">
                  <BlurImage
                    src={val.image}
                    width={200}
                    height={200}
                    alt="banner"
                    style={contentStyle}
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </Carousel>
            <div className="absolute left-0 top-0 flex h-full w-full flex-col justify-between p-3">
              {avg_rating ? (
                <div className="flex w-fit items-center gap-1 rounded-lg bg-warn px-2 py-1 align-baseline text-sm font-medium text-primary-dark">
                  <StarIcon />
                  <span className="leading-[16px]">{avg_rating?.toFixed(1)}</span>
                </div>
              ) : null}
            </div>
            <div className="absolute bottom-4 right-4 flex flex-row gap-2">
              <button
                aria-label="previous favorites"
                type="button"
                className="relative flex h-7 w-7 items-center justify-center overflow-hidden rounded bg-primary-dark/20 text-white"
                onClick={(e) => {
                  e.preventDefault()
                  if (slider.current) {
                    slider.current.prev()
                  }
                }}
              >
                <span className="absolute left-0 top-0 h-full w-full rounded backdrop-blur-sm" />
                <ArrowLeftIcon2 className="relative text-[8px]" />
              </button>
              <button
                aria-label="next favorites"
                type="button"
                className="relative flex h-7 w-7 items-center justify-center overflow-hidden rounded bg-primary-dark/20 text-white"
                onClick={(e) => {
                  e.preventDefault()
                  if (slider.current) {
                    slider.current.next()
                  }
                }}
              >
                <span className="absolute left-0 top-0 h-full w-full rounded backdrop-blur-sm" />
                <ArrowRightIcon2 className="relative text-[8px]" />
              </button>
            </div>
          </div>
          <Flex vertical gap={12} className="relative flex-1">
            <CRate disabled allowHalf defaultValue={star_rating} />
            <Typography.Title level={4} className="line-clamp-1">
              {placement_name}
            </Typography.Title>
            <div className="flex flex-row items-start gap-3 text-sm text-secondary">
              <LocationIcon className="text-xs" />
              <span className="line-clamp-1">{address}</span>
            </div>
            <div className="flex-1">
              <Typography.Text className="line-clamp-2 text-sm text-secondary">
                {description}
              </Typography.Text>
            </div>

            <Flex className="absolute right-0 top-0">
              <Button
                aria-label="favorite add"
                type="text"
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary-light text-danger duration-200 hover:bg-danger/10 hover:text-danger"
                onClick={favoriteHandler}
              >
                <FavoriteFilledIcon />
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Link>
    </Card>
  )
}

export default FavoriteItem
