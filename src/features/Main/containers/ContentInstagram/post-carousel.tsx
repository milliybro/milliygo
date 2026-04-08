import Link from 'next/link'
import { useRef } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Carousel, Typography } from 'antd'
import { useTranslations } from 'next-intl'

import { getAdsBanner } from '../../api'

import ArrowLeftIcon2 from '@/components/icons/arrow-left-2'
import ArrowRightIcon2 from '@/components/icons/arrow-right-2'
import ArrowRightUpIcon2 from '@/components/icons/arrow-right-up-2'

import type { CarouselRef } from 'antd/es/carousel'
import { LazyLoadImage } from 'react-lazy-load-image-component'

export default function HeroCarousel() {
  const carouselRef = useRef<CarouselRef>(null)
  const t = useTranslations()

  const { data: adsBanners, isLoading: adsBannersLoading } = useQuery({
    queryKey: ['ads-banners'],
    queryFn: getAdsBanner,
  })

  const banners = adsBanners?.data || []

  return (
    <div className="container relative mb-4 mt-2">
      <Carousel
        ref={carouselRef}
        dots={false}
        effect="fade"
        className="mt-2 overflow-hidden rounded-[20px] bg-white [&_.slick-track]:!gap-0"
        slidesPerRow={1}
        autoplay
        autoplaySpeed={5000}
      >
        {banners.map((banner) => {
          const partner = banner.partner_details
          const href = `/store/${partner?.uuid}?id=${partner?.id}`

          return (
            <div key={banner.id}>
              <Link href={href}>
                <LazyLoadImage
                  className="h-[350px] w-full object-cover"
                  src={banner.image.replace('http://', 'https://')}
                  alt={banner.title}
                />
              </Link>
            </div>
          )
        })}
      </Carousel>

      {!adsBannersLoading && banners.length > 1 && (
        <div className="absolute bottom-4 right-48 z-10 flex items-center gap-3 dsm:-top-56">
          <button
            className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-white transition-all hover:bg-gray-200 hover:shadow-lg"
            onClick={() => carouselRef.current?.prev()}
          >
            <ArrowLeftIcon2 className="-translate-x-[2px]" />
          </button>
          <button
            className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-white transition-all hover:bg-gray-200 hover:shadow-lg"
            onClick={() => carouselRef.current?.next()}
          >
            <ArrowRightIcon2 className="translate-x-[2px]" />
          </button>
        </div>
      )}
    </div>
  )
}
