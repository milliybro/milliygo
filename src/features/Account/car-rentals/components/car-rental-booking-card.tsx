import { useCarRentalOrder } from '@/features/RentCarItem/model/car-rental-order'
import { formatNumber } from '@/helpers/number-formatter'
import dayjs from 'dayjs'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

export default function CarRentalBookingCard() {
  const t = useTranslations()

  const { order } = useCarRentalOrder()

  return (
    <div className="flex gap-5 rounded-2xl items-center mt-10">
      <Image
        width={120}
        height={120}
        src="/cobalt.webp"
        alt="Car Rental"
        className="size-[120px] object-cover rounded-xl"
        draggable={false}
        unoptimized
      />
      <div className="flex flex-col gap-2">
        <div className="text-sm flex items-center">
          <span className="font-semibold min-w-[140px] block">{t('taxi.modul-car')}:</span>{' '}
          <span>Cobalt</span>
        </div>
        <div className="text-sm flex items-center">
          <span className="font-semibold min-w-[140px] block">{t('taxi.color-car')}:</span>{' '}
          <span className="translate">Красный металлик</span>
        </div>
        <div className="text-sm flex items-center">
          <span className="font-semibold min-w-[140px] block">{t('user.price')}:</span>{' '}
          <span>{formatNumber(order?.price)} UZS</span>
        </div>
      </div>
      <div className="flex gap-5 h-full ml-auto">
        <div className="flex flex-col gap-1">
          <div className="text-sm">{t('taxi.delivery')}</div>
          <div className="font-semibold translate">{order?.delivery}</div>
          <div className="text-sm text-secondary">
            {dayjs(Array.isArray(order?.date) ? order?.date[0] : order?.date)
              .format('ddd, DD MMM, 12:00')
              .replaceAll('.', '')}
          </div>
        </div>
        <div className="w-[1px] bg-secondary/10"></div>
        <div className="flex flex-col gap-1">
          <div className="text-sm">{t('taxi.destination')}</div>
          <div className="font-semibold translate">{order?.return}</div>
        </div>
      </div>
    </div>
  )
}
