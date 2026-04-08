import { Typography } from 'antd'
import { useTranslations } from 'next-intl'

function SpecialRequest() {
  const t = useTranslations()
  return (
    <div className="py-5 md:px-6">
      <h2 className="mb-3 text-base font-semibold md:mb-4 md:text-lg md:font-bold">
        {t('booking.special-request')}:
      </h2>

      <Typography.Text className="text-sm font-normal md:text-base">
        {t('booking.special-request-text')}
      </Typography.Text>
    </div>
  )
}

export default SpecialRequest
