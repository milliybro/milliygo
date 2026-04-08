import { useTranslations } from 'next-intl'

function DetailsFacilities({ data }: any) {
  const t = useTranslations()

  return (
    <div className="mt-4 flex flex-col gap-5 px-6 py-5">
      <div>
        <h2 className="mb-4 text-lg font-bold">{t('booking.view-details')}:</h2>

        <div className="flex flex-col justify-between gap-4 divide-x lg:flex-row">
          <div className="flex flex-1 flex-col gap-3">
            <p className="flex justify-between text-[14px] text-primary-dark">
              <span>{t('user.type-number')}:</span>{' '}
              <span className="font-semibold">{data?.items?.[0]?.room?.name}</span>
            </p>
            <p className="flex justify-between text-[14px] text-primary-dark">
              <span>{t('booking.guest')}:</span>{' '}
              <span className="font-semibold">
                {data?.first_name} {data?.last_name}
              </span>
            </p>
            <p className="flex justify-between text-[14px] text-primary-dark">
              <span>{t('inputs.meals')}:</span>{' '}
              <span className="font-semibold">{t('booking.meal')}</span>
            </p>

            <p className="text-[14px] text-primary-dark">
              {data?.items?.[0]?.room?.facilities?.map((fc: any) => fc?.name)?.join(' • ')}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailsFacilities
