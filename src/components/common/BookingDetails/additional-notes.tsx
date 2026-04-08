import { Typography } from 'antd'
import { useTranslations } from 'next-intl'

interface IProps {
  hotelName?: string
}

function AdditionalNotes({ hotelName }: IProps) {
  const t = useTranslations()
  return (
    <div className="px-6 py-5">
      <Typography.Text className="whitespace-pre-wrap text-base font-normal">
        {t('booking.additional-notes', { name: hotelName || '' })}
      </Typography.Text>
    </div>
  )
}

export default AdditionalNotes
