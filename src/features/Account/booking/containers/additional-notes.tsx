import { Typography } from 'antd'
import { useTranslations } from 'next-intl'

interface IProps {
  hotelName?: string
}

function AdditionalNotes({ hotelName }: IProps) {
  const t = useTranslations()
  return (
    <div className="py-5 md:px-6">
      <Typography.Text className="whitespace-pre-wrap text-sm font-normal md:text-base">
        {t('booking.additional-notes', { name: hotelName || '' })}
      </Typography.Text>
    </div>
  )
}

export default AdditionalNotes
