import Icon from '@ant-design/icons/lib/components/Icon'

import React, { ReactElement } from 'react'
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'

const defaultIcon = (): React.ReactElement => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 14" fill="none">
    <path
      d="M3.45403 9.19727C2.61565 9.68867 0.41746 10.6921 1.7563 11.9477C2.41032 12.561 3.13872 12.9997 4.0545 12.9997H9.28014C10.1959 12.9997 10.9243 12.561 11.5783 11.9477C12.9172 10.6921 10.719 9.68867 9.88061 9.19727C7.91461 8.04492 5.42002 8.04492 3.45403 9.19727Z"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9.33333 3.66667C9.33333 5.13943 8.13943 6.33333 6.66667 6.33333C5.19391 6.33333 4 5.13943 4 3.66667C4 2.19391 5.19391 1 6.66667 1C8.13943 1 9.33333 2.19391 9.33333 3.66667Z"
      stroke="currentColor"
      strokeWidth="1.2"
    />
    <path
      d="M14.6673 2L13.0007 3.66667M13.0007 3.66667L11.334 5.33333M13.0007 3.66667L14.6673 5.33333M13.0007 3.66667L11.334 2"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default function UserRemoveIcon(props: Partial<CustomIconComponentProps>): ReactElement {
  return <Icon component={defaultIcon} {...props} />
}
