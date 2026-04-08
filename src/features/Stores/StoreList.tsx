import { Typography } from 'antd'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

import RegionCardSkeleton from './components/RegionCardSkeleton'
import { useTranslations } from 'next-intl'
import { getBaseCategories, getRestaurantsList } from '../Main/api'
import HeartIcon from '@/components/icons/heart-icon'
import StarIcon from '@/components/icons/star'
import Link from 'next/link'

interface BaseCategory {
  id: number
  uuid: string
  name: string
  description: string
  logo: string | null
  is_active: boolean
}

const RiderIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="5.5" cy="17.5" r="2.5" />
    <circle cx="18.5" cy="17.5" r="2.5" />
    <path d="M8 17.5h7" />
    <path d="M15 6h2l2 5" />
    <path d="M9 6l1.5 5H19" />
    <path d="M5.5 15l2-6h5" />
  </svg>
)

const FreeDeliveryIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" fill="#A855F7" />
    <path d="M8 12l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const FilterIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="4" y1="6" x2="20" y2="6" />
    <line x1="8" y1="12" x2="16" y2="12" />
    <line x1="11" y1="18" x2="13" y2="18" />
  </svg>
)

const ChevronDown = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
)

const StoreList = () => {
  const t = useTranslations()

  const [activeCategory, setActiveCategory] = useState<number | null>(null)
  const [likedIds, setLikedIds] = useState<Set<number>>(new Set())

  const { data, isLoading } = useQuery({
    queryKey: ['restaurant-list'],
    queryFn: () => getRestaurantsList({ partner_type: "SHOP" }),
  })

  const { data: categoriesData, isLoading: categoriesLoading } = useQuery({
    queryKey: ['base-categories'],
    queryFn: () => getBaseCategories({ partner_type: 'SHOP' }),
  })


  const restaurants = data?.data?.partners || []
  const filteredRestaurants = activeCategory
    ? restaurants.filter((r: any) =>
      r?.base_categories?.includes(activeCategory) ||
      r?.categories?.some((c: any) => c?.id === activeCategory)
    )
    : restaurants

  const toggleLike = (e: React.MouseEvent, id: number) => {
    e.preventDefault()
    e.stopPropagation()
    setLikedIds((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }
  const categoryList: BaseCategory[] = categoriesData?.data?.base_categories || []


  return (
    <div className="container min-h-[60vh] pb-[80px]">
      <Typography.Title level={2} className="mb-2 dsm:text-[28px]">
        Do'konlar
      </Typography.Title>
      {!categoriesLoading && categoryList.length > 0 && (
        <>
          <style>{`.cat-scroll::-webkit-scrollbar{display:none}`}</style>
          <div className="flex items-center gap-2 rounded-[16px] border border-[#E5E7EB] bg-white px-3 py-2.5">
            {/* Scroll area */}
            <div

              className="cat-scroll flex flex-1 items-center gap-1 overflow-x-auto"
              style={{ scrollbarWidth: 'none' }}
            >
              {/* Hammasi */}
              <button
                onClick={() => setActiveCategory(null)}
                className={`whitespace-nowrap rounded-[10px] px-4 py-1.5 text-[14px] font-semibold transition-all duration-200 ${activeCategory === null
                  ? 'bg-[#0c0c0c] text-white'
                  : 'text-[#374151] hover:bg-[#F3F4F6]'
                  }`}
              >
                Hammasi
              </button>

              {categoryList
                .filter((cat) => cat.is_active)
                .map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(activeCategory === cat.id ? null : cat.id)}
                    className={`whitespace-nowrap rounded-[10px] px-4 py-1.5 text-[14px] font-medium transition-all duration-200 ${activeCategory === cat.id
                      ? 'bg-[#0c0c0c] text-white font-semibold'
                      : 'text-[#374151] hover:bg-[#F3F4F6]'
                      }`}
                  >
                    {cat.name}
                  </button>
                ))}

              {/* Yana button */}
              <button className="flex shrink-0 items-center gap-1 whitespace-nowrap rounded-[10px] px-4 py-1.5 text-[14px] font-medium text-[#374151] hover:bg-[#F3F4F6]">
                Yana <ChevronDown />
              </button>
            </div>

            {/* Divider */}
            <div className="h-6 w-px shrink-0 bg-[#E5E7EB]" />

            {/* Saralash */}
            <button className="flex shrink-0 items-center gap-2 whitespace-nowrap rounded-[10px] px-4 py-1.5 text-[14px] font-semibold text-[#0c0c0c] hover:bg-[#F3F4F6]">
              <FilterIcon />
              Saralash
            </button>
          </div>
        </>
      )}
      <div className="mt-5 grid grid-cols-2 gap-x-5 gap-y-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {!isLoading &&
          filteredRestaurants.map((val: any, i: number) => {
            const secureImage = val?.banner?.replace('http://', 'https://')
            const isLiked = likedIds.has(val?.id ?? i)

            return (
              <Link
                key={'restaurant-item-' + i}
                href={`/store/${val?.uuid}?id=${val?.id}`}
                className="group flex flex-col gap-3"
              >
                {/* Image */}
                <div className="relative h-[185px] w-full overflow-hidden rounded-[16px] bg-[#F3F4F6]">
                  {secureImage && (
                    <img
                      src={secureImage}
                      alt={val?.name || 'Restaurant'}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                  <button
                    onClick={(e) => toggleLike(e, val?.id ?? i)}
                    className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow-sm backdrop-blur-sm transition-transform hover:scale-110"
                  >
                    <HeartIcon filled={isLiked} />
                  </button>
                </div>

                {/* Info */}
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="line-clamp-1 text-[15px] font-bold text-[#0c0c0c] transition-colors group-hover:text-[#00D166]">
                      {val?.name}
                    </span>
                    {val?.rating && (
                      <span className="flex shrink-0 items-center gap-1 text-[13px] font-semibold text-[#0c0c0c]">
                        <StarIcon />
                        {val.rating}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <RiderIcon />
                    <span className="text-[13px] text-[#6B7280]">
                      {val?.delivery_time || '15–25 daqiqa'}
                    </span>
                  </div>
                  {(val?.discount || val?.free_delivery) && (
                    <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                      {val?.discount && (
                        <span className="rounded-[6px] bg-[#DCFCE7] px-2 py-0.5 text-[11px] font-semibold text-[#15803D]">
                          {val.discount}
                        </span>
                      )}
                      {val?.free_delivery && (
                        <span className="flex items-center gap-1 rounded-full bg-[#F3E8FF] px-2.5 py-0.5 text-[11px] font-semibold text-[#7C3AED]">
                          <FreeDeliveryIcon />
                          Bepul yetkazish
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </Link>
            )
          })}
        {isLoading && (
          <>
            <RegionCardSkeleton />
            <RegionCardSkeleton />
            <RegionCardSkeleton />
            <RegionCardSkeleton />
          </>
        )}
      </div>
    </div>
  )
}

export default StoreList
