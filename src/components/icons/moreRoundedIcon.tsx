import Icon from '@ant-design/icons/lib/components/Icon'

import React, { ReactElement } from 'react'
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'

const defaultIcon = (): React.ReactElement => (
  <svg width="1em" height="1em" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M9.99203 10H9.99951"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9.98812 13.3333H9.9956"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9.99984 6.6665H10.0073"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M2.07031 9.99992C2.07031 6.26797 2.07031 4.40199 3.22968 3.24262C4.38905 2.08325 6.25503 2.08325 9.98698 2.08325C13.7189 2.08325 15.5849 2.08325 16.7443 3.24262C17.9036 4.40199 17.9036 6.26797 17.9036 9.99992C17.9036 13.7319 17.9036 15.5978 16.7443 16.7572C15.5849 17.9166 13.7189 17.9166 9.98698 17.9166C6.25503 17.9166 4.38905 17.9166 3.22968 16.7572C2.07031 15.5978 2.07031 13.7319 2.07031 9.99992Z"
      stroke="currentColor"
      strokeWidth="1.5"
    />
  </svg>
)

export default function MoreRoundedIcon(props: Partial<CustomIconComponentProps>): ReactElement {
  return <Icon component={defaultIcon} {...props} />
}
