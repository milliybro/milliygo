import { Typography } from 'antd'
import { useTranslations } from 'next-intl'

function SpecialRequest() {
  const t = useTranslations()
  return (
    <div className="px-6 py-5">
      <h2 className="mb-4 text-lg font-bold">{t('booking.special-request')}:</h2>

      <Typography.Text className="text-base font-normal">
        {t('booking.special-request-text')}
      </Typography.Text>
    </div>
  )
}

export default SpecialRequest
