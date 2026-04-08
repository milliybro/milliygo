import { memo } from 'react'
import { Rate, RateProps } from 'antd'

import type { FC } from 'react'
import StarIcon from '../icons/star'

const CRate: FC<RateProps> = (props) => {
  return (
    <Rate
      {...props}
      character={<StarIcon />}
      className="gap-0 [&_.ant-rate-star-full]:text-warn [&_.ant-rate-star-zero]:text-red-600 [&_.ant-rate-star]:me-1"
    />
  )
}

export default memo(CRate)
