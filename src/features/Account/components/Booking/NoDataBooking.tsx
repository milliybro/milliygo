import { useRouter } from 'next/router'
import { Button, Typography } from 'antd'
import { useTranslations } from 'next-intl'

import BriefcaseIcon from '@/components/icons/briefcase'

import type { FC } from 'react'
import { useMediaQuery } from '@/utils/useMediaQuery'

interface IProps {
  title?: string
  description?: string
  onClick?: () => void
}

const NoDataBooking: FC<IProps> = ({ title, description, onClick }) => {
  const t = useTranslations()
  const { push } = useRouter()
  const isMedium = useMediaQuery('(max-width: 768px)')

  const clickHandler = () => {
    push('/')

    if (onClick) {
      onClick()
    }
  }

  return (
    <div className="mt-[50px] flex h-full flex-col items-center justify-center gap-5 md:mt-0">
      <div className="flex h-[56px] w-[56px] items-center justify-center rounded-2xl bg-[#F8F8FA]">
        <BriefcaseIcon className="text-2xl" />
      </div>
      <Typography className="max-w-[412px] text-center">
        <Typography.Title level={isMedium ? 4 : 3}>
          {title || t('booking.no-booking')}
        </Typography.Title>
        <Typography.Text>{description || t('booking.no-booking-text')}</Typography.Text>
      </Typography>
      <Button
        aria-label={t('booking.add-booking')}
        type="link"
        size="large"
        className="!h-[58px] font-medium"
        onClick={clickHandler}
      >
        {t('booking.add-booking')}
      </Button>
    </div>
  )
}

export default NoDataBooking
