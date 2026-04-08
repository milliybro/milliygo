import Image from 'next/image'
import { useRouter } from 'next/router'

import { Typography } from 'antd'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import locationIcon from '../../../../public/location-map.svg'

const DetailsMap = ({ data }: any) => {
  const { locale } = useRouter()
  const t = useTranslations()

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
    <div className="px-6 py-5">
      <h2 className="mb-4 text-lg font-bold">{t('booking.hotel-address')}:</h2>
      <div className="flex items-center gap-2 text-sm">
        <Typography.Text className="font-semibold">{t('my-properties.address')}: </Typography.Text>
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
            className="h-[350px] w-[384px]"
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
