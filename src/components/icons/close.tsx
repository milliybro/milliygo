import Icon, { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'
import type { ReactElement } from 'react'

const defaultIcon = () => {
  return (
    <svg
      width="1em"
      height="1em"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 14 14"
      fill="none"
    >
      <path
        d="M12.8346 1.1665L1.16797 12.8332M1.16797 1.1665L12.8346 12.8332"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function CloseIcon(props: Partial<CustomIconComponentProps>): ReactElement {
  return <Icon component={defaultIcon} {...props} />
}
