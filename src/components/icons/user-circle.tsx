import Icon from '@ant-design/icons/lib/components/Icon'

import React, { ReactElement } from 'react'
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'

const defaultIcon = (): React.ReactElement => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 22 22" fill="none">
    <circle cx="11" cy="11" r="10" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M6.5 16C8.8317 13.5578 13.1432 13.4428 15.5 16M13.4951 8.5C13.4951 9.88071 12.3742 11 10.9915 11C9.60885 11 8.48797 9.88071 8.48797 8.5C8.48797 7.11929 9.60885 6 10.9915 6C12.3742 6 13.4951 7.11929 13.4951 8.5Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
)

export default function UserCircleIcon(props: Partial<CustomIconComponentProps>): ReactElement {
  return <Icon component={defaultIcon} {...props} />
}
