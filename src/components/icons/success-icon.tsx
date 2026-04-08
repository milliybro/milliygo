import Icon, { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'
import type { ReactElement } from 'react'

const defaultIcon = () => {
  return (
    <svg
      width="1em"
      height="100%"
      viewBox="0 0 48 49"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M44 24.5C44 13.4543 35.0457 4.5 24 4.5C12.9543 4.5 4 13.4543 4 24.5C4 35.5457 12.9543 44.5 24 44.5C35.0457 44.5 44 35.5457 44 24.5Z"
        stroke="currentColor"
        strokeWidth="3"
      />
      <path
        d="M16 25.5L21 30.5L32 18.5"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function SuccessIcon(props: Partial<CustomIconComponentProps>): ReactElement {
  return <Icon component={defaultIcon} {...props} />
}
