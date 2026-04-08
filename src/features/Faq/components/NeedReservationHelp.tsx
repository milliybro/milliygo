import { useRouter } from 'next/router'
import { Button, Card, Flex, Typography } from 'antd'

import InfoSquareIcon from '@/components/icons/info-square'
import ArrowRightUpIcon from '@/components/icons/arrow-right-up'
import { useTranslations } from 'next-intl'

const NeedReservationHelp = () => {
  const router = useRouter()
  const t = useTranslations()

  const clickHandler = () => {
    router.push('/faq/send-message')
  }

  return (
    <Card variant="borderless" styles={{ body: { padding: 16 } }} className="mb-6 rounded-2xl">
      <Flex gap={12} align="flex-start">
        <InfoSquareIcon className="text-xl text-secondary" />
        <Flex vertical>
          <Typography.Text className="mb-1 text-base font-semibold leading-5">
            {t('booking.need_reservation_help')}
          </Typography.Text>
          <Typography.Text className="mb-4 text-sm text-secondary">
            {t('faq.need-help-description')}
          </Typography.Text>
          <Button
            aria-label={t('faq.send-support')}
            size="small"
            type="link"
            className="flex w-fit items-center px-0"
            onClick={clickHandler}
          >
            {t('faq.send-support')} <ArrowRightUpIcon />
          </Button>
        </Flex>
      </Flex>
    </Card>
  )
}

export default NeedReservationHelp
