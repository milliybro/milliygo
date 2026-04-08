import { UserOutlined } from '@ant-design/icons'
import { Avatar, Card, Divider, Flex, Typography } from 'antd'

import QuoteIcon from '../icons/quote'
import CRate from './CRate'

import type { FC } from 'react'

interface IProps {
  light?: boolean
  review: string
  rating: number
  user: {
    id: number
    username: string
    first_name: string
    middle_name: string
    last_name: string
    avatar: string
  }
}

const UserReviewCard: FC<IProps> = ({ light, review, rating, user }) => {
  return (
    <Card
      variant="borderless"
      style={{ padding: 0, height: '100%' }}
      className={`flex h-full flex-col overflow-hidden p-5 ${
        light ? 'bg-white' : 'bg-primary-dark'
      }`}
      styles={{ body: { height: '100%', padding: 0 } }}
    >
      <Flex vertical className="h-full">
        <QuoteIcon className="mb-4 text-[22px] text-slate-300/20" />
        <div className="flex-1">
          <Typography.Text className={`leading-[160%] ${light ? '' : 'text-white'}`}>
            {review}
          </Typography.Text>
        </div>
        <Divider className="bg-slate-300/10" />
        <Flex gap={24} align="center">
          <Avatar size="large" icon={<UserOutlined />} src={user?.avatar} alt="user avatar image" />
          <Flex vertical>
            <Typography.Text className={`mb-1 text-sm ${light ? '' : 'text-white'}`}>
              {user?.first_name + ' ' + user?.last_name}
            </Typography.Text>
            <CRate className="text-sm" disabled allowHalf defaultValue={rating} />
          </Flex>
        </Flex>
      </Flex>
    </Card>
  )
}

export default UserReviewCard
