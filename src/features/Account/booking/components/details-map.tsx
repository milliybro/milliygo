import Image from 'next/image'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'

import { getBookingsItem } from '../../api'

import locationIcon from '../../../../../public/location-map.svg'
import Link from 'next/link'
import { Typography } from 'antd'
import { useTranslations } from 'next-intl'

const DetailsMap = () => {
  const { query, locale } = useRouter()
  const t = useTranslations()

  const { data } = useQuery({
    queryKey: ['bookings-detail'],
    queryFn: () => getBookingsItem(query.bookingId as any),
    enabled: Boolean(Number(query.bookingId)),
  })

  const baseMapUrl = 'https://static-maps.yandex.ru/1.x/'
  const mapSize = '384,350'
  const zoomLevel: number = 16
  const offset = zoomLevel === 15 ? 0.01642 : 0.00823
  const layer = 'map'

  const { long = 0, lat = 0 } = data?.placement || {}

  const staticMapUrls =
    long && lat
      ? [
          `${baseMapUrl}?ll=${+long - +offset},${lat}&z=${zoomLevel}&l=${layer}&size=${mapSize}&lang=${locale}`,
          `${baseMapUrl}?ll=${long},${lat}&z=${zoomLevel}&l=${layer}&size=${mapSize}&lang=${locale}`,
          `${baseMapUrl}?ll=${+long + +offset},${lat}&z=${zoomLevel}&l=${layer}&size=${mapSize}&lang=${locale}`,
        ]
      : []

  const yandexLink = `https://yandex.uz/maps/?ll=${long},${lat}&mode=routes&rtext=~${lat},${long}&z=16`

  return (
    <div className="py-5 md:px-6">
      <h2 className="mb-3 text-base font-semibold md:mb-4 md:text-lg md:font-bold">
        {t('booking.hotel-address')}:
      </h2>
      <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm">
        <Typography.Text className="font-medium md:font-semibold">
          {t('my-properties.address')}:{' '}
        </Typography.Text>
        <Typography.Text className="translate">{data?.placement?.address}</Typography.Text>
      </div>
      {data?.placement?.user?.phone && (
        <div className="flex items-center gap-2 text-sm">
          <Typography.Text className="font-semibold">
            {t('transport.phone.label')}:{' '}
          </Typography.Text>
          <Typography.Text>{data?.placement?.user?.phone}</Typography.Text>
        </div>
      )}
      <Link
        href={yandexLink}
        target="_blank"
        className="relative mt-4 flex h-[350px] w-full select-none items-center justify-center overflow-hidden rounded-[40px] border border-secondary/10 bg-gray-100"
      >
        {staticMapUrls.map((val, i) => (
          <Image
            key={'static-map-image-' + i}
            draggable={false}
            src={val}
            width={1000}
            height={1000}
            alt="hotel image"
            className="h-[350px] w-[384px] object-cover"
            unoptimized
          />
        ))}

        <Image
          draggable={false}
          alt="location icon"
          width={50}
          height={50}
          src={locationIcon}
          className="absolute left-[calc(50%-25px)] top-[calc(50%-50px)]"
          unoptimized
        />
      </Link>
    </div>
  )
}

export default DetailsMap
