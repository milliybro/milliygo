import { Card, Flex, Typography } from 'antd'
import type { FC, ReactNode } from 'react'

const { Text, Title } = Typography

interface IProps {
  icon: ReactNode
  title: string
  description?: string
  button?: ReactNode
}

const StatusPopup: FC<IProps> = ({ icon, title, description, button }) => {
  return (
    <Card variant="borderless" className="max-w-[436px] w-full" style={{ padding: '32px' }}>
      <Flex vertical align="center">
        <div className="h-[80px] w-[80px] rounded-3xl flex justify-center items-center mb-8 bg-[#F8F8FA]">
          {icon}
        </div>
        <Title level={3} className="text-center mb-4">
          {title}
        </Title>
        {description ? (
          <Text className="text-secondary text-center mb-6 whitespace-pre-line">{description}</Text>
        ) : null}
        {button}
      </Flex>
    </Card>
  )
}

export default StatusPopup
