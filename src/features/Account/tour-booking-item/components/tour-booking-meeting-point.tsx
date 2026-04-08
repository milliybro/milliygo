import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

type TourBookingMeetingPointProps = {
  latitude?: number
  longitude?: number
}

export default function TourBookingMeetingPoint({
  latitude,
  longitude,
}: TourBookingMeetingPointProps) {
  const t = useTranslations()
  const { locale } = useRouter()
  const baseMapUrl = 'https://static-maps.yandex.ru/1.x/'
  const mapSize = '384,350'
  const zoomLevel: number = 16
  const offset = zoomLevel === 15 ? 0.01642 : 0.00823
  const layer = 'map'

  const [lat, long] = [latitude || 41.310408, longitude || 69.275777]

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
    <div className="space-y-[7px]">
      <div className="text-dark text-lg font-bold">{t('tours.meeting-point')}</div>
      <Link
        href={yandexLink}
        target="_blank"
        className="relative flex h-[350px] w-full select-none items-center justify-center overflow-hidden rounded-3xl bg-gray-100"
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
          src="/location-map.svg"
          className="absolute left-[calc(50%-25px)] top-[calc(50%-50px)]"
          unoptimized
        />
      </Link>
    </div>
  )
}
