import { useTranslations } from 'next-intl'

const DetailsRoomsInformation = () => {
  const t = useTranslations()

  return (
    <div className="py-5 md:px-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-base font-semibold text-primary-dark md:text-[18px] md:font-bold">
          {t('booking.final-price')}
        </h1>
        <p className="text-xs text-primary-dark md:text-[14px]">{t('booking.final-price-text')}</p>
      </div>

      <div className="flex flex-col">
        <h2 className="mb-1 mt-3 text-base font-semibold text-primary-dark md:mb-2 md:mt-4 md:text-[18px] md:font-bold">
          {t('booking.additional-info')}
        </h2>
        <p className="text-xs text-primary-dark md:text-[14px]">{t('booking.additional-text')}</p>
      </div>
    </div>
  )
}

export default DetailsRoomsInformation
