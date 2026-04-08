import Icon, { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'
import type { ReactElement } from 'react'

const defaultIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 30 30"
      fill="none"
    >
      <path
        d="M21.875 8.125L7.5 22.5"
        stroke="currentColor"
        strokeWidth={1.875}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 7.5H22.5V20"
        stroke="currentColor"
        strokeWidth={1.875}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function ArrowRightUpIcon2(props: Partial<CustomIconComponentProps>): ReactElement {
  return <Icon component={defaultIcon} {...props} />
}
