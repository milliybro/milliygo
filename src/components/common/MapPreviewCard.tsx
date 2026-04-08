import { Button } from 'antd'
import Image from 'next/image'
import { useState } from 'react'
import { useTranslations } from 'next-intl'
import type { FC, ReactNode } from 'react'

import ModalMap from '../containers/ModalMap/ModalMap'
import { useRouter } from 'next/router'
import { ICulturalHeritageSite } from '@/features/Main/types'

const MapPreviewCard: FC<{
  children?: ReactNode
  siteDetails?: ICulturalHeritageSite
}> = ({ children, siteDetails }) => {
  const t = useTranslations()
  const [modal2Open, setModal2Open] = useState(false)
  const { locale } = useRouter()

  const baseMapUrl = 'https://static-maps.yandex.ru/1.x/'
  const mapSize = '384,350'
  const zoomLevel = 16
  const layer = 'map'
  const [long, lat] = [69.240562, 41.311081]

  const mapPreviewSrc = `${baseMapUrl}?ll=${long},${lat}&z=${zoomLevel}&l=${layer}&size=${mapSize}&lang=${locale}`

  return (
    <>
      <div className="relative h-[230px] overflow-hidden rounded-2xl dmd:h-[50px]">
        {/* <div
          style={{
            width: '100%',
            maxWidth: 382,
            height: 230,
            objectFit: 'cover',
            position: 'absolute',
            top: 0,
            left: 0,
            objectPosition: 'center',
          }}
        > */}

        <Image
          fill
          src={mapPreviewSrc}
          unoptimized
          alt="Map preview"
          className="h-full w-full object-cover dmd:hidden"
        />
        {/* <YMaps>
            <Map
              instanceRef={mapRef as any}
              width="1200"
              height="100%"
              defaultState={{ zoom: 15, center: [41.34226, 69.336241] }}
            ></Map>
          </YMaps> */}

        <div className="absolute left-0 top-0 h-full w-full"></div>
        <div className="flex h-full w-full items-center justify-center dmd:justify-start">
          <Button
            type="text"
            size="large"
            className="bg-white text-primary hover:bg-white/70 dmd:bg-transparent dmd:p-0"
            onClick={() => setModal2Open(true)}
            aria-label={t('buttons.show-on-the-map')}
          >
            {t('buttons.show-on-the-map')}
          </Button>
        </div>
      </div>
      <ModalMap open={modal2Open} onCancel={() => setModal2Open(false)} siteDetails={siteDetails}>
        {children}
      </ModalMap>
    </>
  )
}

export default MapPreviewCard
