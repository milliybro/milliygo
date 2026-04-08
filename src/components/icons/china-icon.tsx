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
      <g clipPath="url(#clip0_4161_53568)">
        <rect width="21" height="15" rx="3" fill="#F93939" />
        <path
          d="M19 0H2C0.89543 0 0 0.89543 0 2V13C0 14.1046 0.89543 15 2 15H19C20.1046 15 21 14.1046 21 13V2C21 0.89543 20.1046 0 19 0Z"
          fill="#F93939"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M5.49909 7.23L4.02909 8.003L4.30909 6.366L3.12109 5.206L4.76409 4.969L5.49909 3.479L6.23309 4.969L7.87609 5.206L6.68609 6.366L6.96809 8.002L5.49909 7.23ZM9.00109 3H10.0011V4H9.00109V3ZM10.0011 5H11.0011V6H10.0011V5ZM10.0011 7H11.0011V8H10.0011V7ZM9.00109 9H10.0011V10H9.00109V9Z"
          fill="#FFDA2C"
        />
      </g>
      <defs>
        <clipPath id="clip0_4161_53568">
          <rect width="21" height="15" rx="3" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}

export default function ChinaFlagIcon(props: Partial<CustomIconComponentProps>): ReactElement {
  return <Icon component={defaultIcon} {...props} />
}
