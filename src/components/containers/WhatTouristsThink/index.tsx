import { useQuery } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import { useCallback, useRef } from 'react'
import { Carousel, Flex, Typography } from 'antd'

import { getPlatformReviews } from '@/features/Main/api'

import UserReviewCard from '../../common/UserReviewCard'
import ArrowLeftIcon from '../../icons/arrow-left'
import ArrowRightIcon from '../../icons/arrow-right'

import type { CarouselRef } from 'antd/es/carousel'

const WhatTouristsThink = () => {
  const t = useTranslations('main')
  const sliderRef = useRef<CarouselRef>(null)

  const { data: reviews } = useQuery({
    queryKey: ['get-platform-reviews'],
    queryFn: async () => {
      const res = await getPlatformReviews()
      return res
    },
  })

  const handlePrev = useCallback(() => {
    if (sliderRef.current) {
      sliderRef.current.prev()
    }
  }, [])

  const handleNext = useCallback(() => {
    if (sliderRef.current) {
      sliderRef.current.next()
    }
  }, [])

  return (
    <div className="overflow-hidden bg-primary-dark/80">
      <div className="container py-[80px]">
        <Flex justify="space-between" className="mb-[40px] items-center">
          <Typography.Title level={2} className="m-0 text-white dsm:text-[18px]">
            {t('reviews-title')}
          </Typography.Title>
          <div className="flex flex-row gap-4">
            <button
              aria-label="previous what you think"
              onClick={handlePrev}
              className="h-11 w-11 rounded-full border border-transparent text-white duration-300 hover:border-secondary"
            >
              <ArrowLeftIcon className="text-lg" />
            </button>
            <button
              aria-label="next what you think"
              onClick={handleNext}
              className="h-11 w-11 rounded-full border border-transparent text-white duration-300 hover:border-secondary"
            >
              <ArrowRightIcon className="text-lg" />
            </button>
          </div>
        </Flex>

        <div className="w-full overflow-hidden">
          <Carousel
            ref={sliderRef}
            slidesToShow={3}
            dots={false}
            infinite={false}
            className="custom-carousel-class [&>.slick-list]:overflow-visible [&>.slick-slide]:!h-full"
          >
            {reviews?.results?.map((val, i) => (
              <UserReviewCard
                key={'main-slide-tourists-item-' + i}
                review={val.review}
                rating={val.rating}
                user={val.user}
              />
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  )
}

export default WhatTouristsThink
