import { Tag, TagProps } from 'antd'

import StarIcon from '../icons/star'
import type { FC } from 'react'

interface IProps extends TagProps {
  value: string
}

const RateTag: FC<IProps> = (props) => {
  return (
    <Tag
      bordered={false}
      className={`bg-warn text-sm px-2 h-[26px] font-medium flex items-center m-0 gap-1 ${props.className}`}
    >
      <StarIcon /> {props.value}
    </Tag>
  )
}

export default RateTag
