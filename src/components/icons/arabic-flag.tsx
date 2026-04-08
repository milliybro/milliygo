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
      <g clipPath="url(#clip0_4161_53580)">
        <rect width="1em" height="1em" rx="3" fill="white" />
        <path fillRule="evenodd" clipRule="evenodd" d="M0 10H21V15H0V10Z" fill="#F93939" />
        <path fillRule="evenodd" clipRule="evenodd" d="M0 0H21V5H0V0Z" fill="#249F58" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0 15.033V0L7 5V10L0 15.033Z"
          fill="#151515"
        />
      </g>
      <defs>
        <clipPath id="clip0_4161_53580">
          <rect width="1em" height="1em" rx="3" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}

export default function ArabicFlagIcon(props: Partial<CustomIconComponentProps>): ReactElement {
  return <Icon component={defaultIcon} {...props} />
}
