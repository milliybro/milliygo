import Icon, { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'
import type { ReactElement } from 'react'

const defaultIcon = () => {
  return (
    <svg
      width="1em"
      height="100%"
      viewBox="0 0 21 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_4161_53703)">
        <rect width="21" height="15" rx="3" fill="white" />
        <path fillRule="evenodd" clipRule="evenodd" d="M0 10H21V15H0V10Z" fill="#00B731" />
        <path
          d="M10.5 9C11.3284 9 12 8.32843 12 7.5C12 6.67157 11.3284 6 10.5 6C9.67157 6 9 6.67157 9 7.5C9 8.32843 9.67157 9 10.5 9Z"
          fill="#FF6C2D"
        />
        <path fillRule="evenodd" clipRule="evenodd" d="M0 0H21V5H0V0Z" fill="#FF6C2D" />
      </g>
      <defs>
        <clipPath id="clip0_4161_53703">
          <rect width="21" height="15" rx="3" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}

export default function IndiaFlagIcon(props: Partial<CustomIconComponentProps>): ReactElement {
  return <Icon component={defaultIcon} {...props} />
}
