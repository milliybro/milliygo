import Icon, { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'
import { ReactElement } from 'react'

const defaultIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 48 48" fill="none">
    <path
      d="M44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44C35.0457 44 44 35.0457 44 24Z"
      stroke="currentColor"
      strokeWidth="2.5"
    />
    <path
      d="M24.4844 34V24C24.4844 23.0572 24.4844 22.5858 24.1915 22.2929C23.8986 22 23.4272 22 22.4844 22"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M23.984 16H24.002"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default function InfoRoundIcon(props: Partial<CustomIconComponentProps>): ReactElement {
  return <Icon component={defaultIcon} {...props} />
}
