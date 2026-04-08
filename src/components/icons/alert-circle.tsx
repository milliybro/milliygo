import Icon, { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'
import type { ReactElement } from 'react'

const defaultIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 22 22"
      fill="none"
      height="1em"
      width="1em"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.25 11C0.25 5.06294 5.06294 0.25 11 0.25C16.9371 0.25 21.75 5.06294 21.75 11C21.75 16.9371 16.9371 21.75 11 21.75C5.06294 21.75 0.25 16.9371 0.25 11ZM10 15C10 14.4477 10.4457 14 10.9955 14H11.0045C11.5543 14 12 14.4477 12 15C12 15.5523 11.5543 16 11.0045 16H10.9955C10.4457 16 10 15.5523 10 15ZM10 11C10 11.5523 10.4477 12 11 12C11.5523 12 12 11.5523 12 11V7C12 6.44772 11.5523 6 11 6C10.4477 6 10 6.44772 10 7V11Z"
        fill="currentColor"
      />
    </svg>
  )
}

export default function AlertCircleIcon(props: Partial<CustomIconComponentProps>): ReactElement {
  return (
    <Icon component={defaultIcon} {...props} className={`w-[22px] h-[22px] ${props.className}`} />
  )
}
