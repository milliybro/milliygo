import { useTranslations } from 'next-intl'

const DetailsRoomsInformation = () => {
  const t = useTranslations()

  return (
    <div className="px-6 py-5">
      <div className="flex flex-col gap-2">
        <h1 className="text-[18px] font-bold text-primary-dark">{t('booking.final-price')}</h1>
        <p className="text-[14px] text-primary-dark">{t('booking.final-price-text')}</p>
      </div>

      <div className="flex flex-col">
        <h2 className="mb-2 mt-4 text-[18px] font-bold text-primary-dark">
          {t('booking.additional-info')}
        </h2>
        <p className="text-[14px] text-primary-dark">{t('booking.additional-text')}</p>
      </div>
    </div>
  )
}

export default DetailsRoomsInformation
