import { Typography } from 'antd'
import type { ReactElement } from 'react'

export default function MainText({
  title,
  description,
}: {
  title: string
  description: string
}): ReactElement {
  return (
    <>
      <Typography.Title className="!mb-3 text-center text-[28px]">{title}</Typography.Title>
      <Typography className="mb-8 text-center text-[14px] leading-[140%] dmd:text-[16px]">
        {description}
      </Typography>
    </>
  )
}
