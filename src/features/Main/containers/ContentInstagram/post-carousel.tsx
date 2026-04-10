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
    <div className="relative mb-4 mt-2">
      <Carousel
        ref={carouselRef}
        dots={true}
        dotPosition="bottom"
        className="mt-2 overflow-hidden rounded-[24px] bg-white group"
        autoplay
        autoplaySpeed={5000}
      >
        {banners.map((banner) => {
          const partner = banner.partner_details
          const href = `/store/${partner?.uuid}?id=${partner?.id}`

          return (
            <div key={banner.id} className="relative">
              <Link href={href} className="block w-full">
                <div className="relative overflow-hidden rounded-[24px]">
                  <LazyLoadImage
                    className="h-[200px] md:h-[350px] w-full object-cover"
                    src={banner.image.replace('http://', 'https://')}
                    alt={banner.title}
                  />
                  {/* Subtle Gradient Overlay for Premium Look */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent md:hidden" />
                </div>
              </Link>
            </div>
          )
        })}
      </Carousel>

      {/* Modern Floating Controls - Hidden on very small screens, visible on hover for desktop */}
      {!adsBannersLoading && banners.length > 1 && (
        <div className="absolute top-1/2 -translate-y-1/2 left-4 right-4 z-10 hidden md:flex items-center justify-between pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full bg-white/90 backdrop-blur shadow-md transition-all hover:bg-white active:scale-90"
            onClick={() => carouselRef.current?.prev()}
          >
            <ArrowLeftIcon2 className="w-5 h-5 -translate-x-[1px]" />
          </button>
          <button
            className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full bg-white/90 backdrop-blur shadow-md transition-all hover:bg-white active:scale-90"
            onClick={() => carouselRef.current?.next()}
          >
            <ArrowRightIcon2 className="w-5 h-5 translate-x-[1px]" />
          </button>
        </div>
      )}
    </div>
  )
}

