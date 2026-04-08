import { Flex, Typography, Carousel, Button } from 'antd'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { useRef } from 'react'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'

import { getRestaurantsList } from '../../api'
import { useRouter } from 'next/router'

const LightningIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="#F59E0B" xmlns="http://www.w3.org/2000/svg">
    <path d="M13 2L4.09 12.96C3.74 13.41 4.07 14 4.65 14H11L11 22L19.91 11.04C20.26 10.59 19.93 10 19.35 10H13L13 2Z"
      fill="#F59E0B" />
  </svg>
)

function chunkArray<T>(arr: T[], size: number): T[][] {
  const chunks: T[][] = []
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size))
  }
  return chunks
}

function StoreList() {
  const carouselRef = useRef<any>(null)
  const router = useRouter()

  const { data, isLoading } = useQuery({
    queryKey: ['restaurant-list'],
    queryFn: () => getRestaurantsList({ partner_type: "SHOP" }),
  })

  const restaurants = data?.data?.partners || []
  const chunkedRestaurants = chunkArray(restaurants, 4)

  return (
    <div className="container mb-10 flex flex-col gap-4">
      {/* Header */}
      <Flex justify="space-between" align="center">
        <Typography.Title level={2} className="!m-0 !text-[22px] !font-bold !text-[#0c0c0c]">
          Do'konlar
        </Typography.Title>

        <Button onClick={() => router.push('/store')} className="rounded-full border border-[#E5E7EB] bg-white px-5 py-1.5 text-[14px] font-medium text-[#0c0c0c] transition hover:border-[#00D166] hover:text-[#00D166]">
          Hammasi
        </Button>
      </Flex>

      {/* Carousel wrapper */}
      {!isLoading && chunkedRestaurants.length > 0 && (
        <div className="relative">
          <Carousel ref={carouselRef} dots={false} infinite={false}>
            {chunkedRestaurants.map((group, slideIndex) => (
              <div key={slideIndex}>
                <div className="grid grid-cols-4 gap-4 pr-2">
                  {group.map((val: any, i: number) => {
                    const secureImage = val?.banner?.replace('http://', 'https://')

                    return (
                      <Link
                        key={'restaurant-item-' + slideIndex + '-' + i}
                        href={`/store/${val?.uuid}?id=${val?.id}`}
                        className="group flex flex-col gap-3"
                      >
                        {/* Card image */}
                        <div className="relative h-[200px] w-full overflow-hidden rounded-[20px] bg-gray-100">
                          {secureImage ? (
                            <img
                              src={secureImage}
                              alt={val?.name || 'Restaurant'}
                              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          ) : (
                            <div className="h-full w-full bg-gradient-to-br from-gray-200 to-gray-300" />
                          )}
                        </div>

                        {/* Info below card */}
                        <div className="flex flex-col gap-0.5 px-1">
                          <span className="text-[15px] font-bold text-[#0c0c0c] group-hover:text-[#00D166] transition-colors">
                            {val?.name}
                          </span>
                          <div className="flex items-center gap-1">
                            <LightningIcon />
                            <span className="text-[13px] text-[#6B7280]">
                              {val?.delivery_time || '15–30 daqiqa'}
                            </span>
                          </div>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </div>
            ))}
          </Carousel>

          <button
            onClick={() => carouselRef.current?.prev()}
            className="absolute -left-5 top-[84px] -translate-y-1/2 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#0c0c0c] shadow-[0_2px_12px_rgba(0,0,0,0.12)] border border-[#F2F2F2] transition-all duration-200 hover:bg-[#00D166] hover:text-white hover:border-[#00D166] hover:shadow-[0_4px_16px_rgba(0,209,102,0.3)]"
          >
            <LeftOutlined style={{ fontSize: 13 }} />
          </button>
          <button
            onClick={() => carouselRef.current?.next()}
            className="absolute -right-5 top-[84px] -translate-y-1/2 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#0c0c0c] shadow-[0_2px_12px_rgba(0,0,0,0.12)] border border-[#F2F2F2] transition-all duration-200 hover:bg-[#00D166] hover:text-white hover:border-[#00D166] hover:shadow-[0_4px_16px_rgba(0,209,102,0.3)]"
          >
            <RightOutlined style={{ fontSize: 13 }} />
          </button>
        </div>
      )}
    </div>
  )
}

export default StoreList