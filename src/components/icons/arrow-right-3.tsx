import Icon, { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'
import type { ReactElement } from 'react'

const icon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 12 12" fill="none">
    <path
      d="M4.50003 10.0001L8.5 6.00009L4.5 2.00012"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeMiterlimit={16}
    />
  </svg>
)

export default function ArrowRightIcon3(props: Partial<CustomIconComponentProps>): ReactElement {
  return <Icon component={icon} {...props} />
}
