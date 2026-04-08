import { Typography } from 'antd'
import { twMerge } from 'tailwind-merge'

import type { ReactElement } from 'react'
import { useMediaQuery } from '@/utils/useMediaQuery'

interface IProps {
  title: string
  description?: string
}

export default function PageHeader({ title, description }: IProps): ReactElement {
  const isMedium = useMediaQuery('(max-width: 768px)')

  return (
    <Typography>
      <Typography.Title
        level={isMedium ? 4 : 3}
        className={twMerge('m-0 leading-[100%] tracking-[2%]', description ? '!mb-2' : '')}
      >
        {title}
      </Typography.Title>
      {description ? (
        <Typography.Text className="tracking-[2%} text-sm leading-[140%] text-secondary">
          {description}
        </Typography.Text>
      ) : null}
    </Typography>
  )
}
