import dayjs from 'dayjs'
import { UserOutlined } from '@ant-design/icons'
import { Avatar, Card, ConfigProvider, Divider, Flex, Typography } from 'antd'
import CRate from './CRate'
import QuoteIcon from '../icons/quote'
import type { FC } from 'react'
import type { IPlacementReview } from '@/types'
import { useRouter } from 'next/router'
import { useTranslations } from 'next-intl'

interface IProps extends IPlacementReview {
  light?: boolean
}

const UserReviewCard2: FC<IProps> = ({ light, review, rating, user, created_at }) => {
  const { locale } = useRouter()
  const t = useTranslations()

  return (
    <Card
      variant="borderless"
      style={{ padding: 0 }}
      className={`flex flex-col justify-between overflow-hidden px-6 py-8 ${
        light ? 'bg-white' : 'bg-primary-dark'
      }`}
      classNames={{ body: 'h-full flex flex-col p-0' }}
    >
      <div className="flex-1">
        <div className="mb-4">
          <QuoteIcon className="text-[22px]" />
        </div>
        <Flex gap={4} align="center" className="mb-4">
          <CRate style={{ fontSize: '12px' }} disabled allowHalf defaultValue={rating} />
          {created_at ? (
            <Typography.Text className="text-sm">
              {dayjs(created_at)
                .locale(locale === 'uz' ? 'uz-latn' : locale || '')
                .format('DD MMMM, YYYY')}
            </Typography.Text>
          ) : null}
        </Flex>
        <Typography.Text
          className={`inline-block h-32 text-base leading-[160%] ${light ? '' : 'text-white'}`}
        >
          <span className="h-24">{review}</span>
        </Typography.Text>
      </div>

      <div className="flex flex-col justify-end">
        <ConfigProvider
          theme={{
            token: {
              colorSplit: 'rgba(119, 126, 144, 0.20)',
            },
          }}
        >
          <Divider className="text-white" />
        </ConfigProvider>
        <Flex gap={16} align="center">
          <Avatar size={40} src={user?.avatar} icon={<UserOutlined />} alt="user avatar image" />
          <Flex vertical>
            <Typography.Text className={`text-sm ${light ? '' : 'text-white'}`}>
              {!user.first_name || !user.last_name
                ? t('others.anonymous')
                : `${user?.first_name} ${user?.last_name}`}
            </Typography.Text>
            <Typography.Text className={`text-sm ${light ? 'text-secondary' : 'text-white'}`}>
              {`${user?.country ? user?.country : ''}${user?.region ? ',' : ''} ${
                user?.region ? user?.region : ''
              }`}
            </Typography.Text>
          </Flex>
        </Flex>
      </div>
    </Card>
  )
}

export default UserReviewCard2
