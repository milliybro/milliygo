import Icon, { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'
import type { ReactElement } from 'react'

const defaultIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        d="M4.16602 12.084C4.16602 12.084 5.41602 12.084 7.08268 15.0007C7.08268 15.0007 11.715 7.36176 15.8327 5.83398"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function TickIcon2(props: Partial<CustomIconComponentProps>): ReactElement {
  return <Icon component={defaultIcon} {...props} />
}
