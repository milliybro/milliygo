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
      <rect x="0.5" y="0.5" width="20" height="14" rx="2.5" fill="white" />
      <rect x="0.5" y="0.5" width="20" height="14" rx="2.5" stroke="#F8F8FA" />
      <path
        d="M10.5 11C12.433 11 14 9.433 14 7.5C14 5.567 12.433 4 10.5 4C8.567 4 7 5.567 7 7.5C7 9.433 8.567 11 10.5 11Z"
        fill="#F93939"
      />
    </svg>
  )
}

export default function JapanFlagIcon(props: Partial<CustomIconComponentProps>): ReactElement {
  return <Icon component={defaultIcon} {...props} />
}
