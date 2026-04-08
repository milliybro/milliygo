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
      <g clipPath="url(#clip0_4161_53552)">
        <rect width="21" height="15" rx="3" fill="#F93939" />
        <path fillRule="evenodd" clipRule="evenodd" d="M0 10H21V15H0V10Z" fill="#FFDA2C" />
        <path fillRule="evenodd" clipRule="evenodd" d="M0 0H21V5H0V0Z" fill="#151515" />
      </g>
      <defs>
        <clipPath id="clip0_4161_53552">
          <rect width="21" height="15" rx="3" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}

export default function GermanyFlagIcon(props: Partial<CustomIconComponentProps>): ReactElement {
  return <Icon component={defaultIcon} {...props} />
}
