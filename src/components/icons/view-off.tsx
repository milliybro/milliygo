import Icon from '@ant-design/icons/lib/components/Icon'

import React, { ReactElement } from 'react'
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'

const defaultIcon = (): React.ReactElement => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="100%" viewBox="0 0 22 10" fill="none">
    <path
      d="M21 1C21 1 17 7 11 7C5 7 1 1 1 1"
      stroke="#B7BFD5"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M14 6.5L15.5 9"
      stroke="#B7BFD5"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M19 4L21 6"
      stroke="#B7BFD5"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M1 6L3 4"
      stroke="#B7BFD5"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8 6.5L6.5 9"
      stroke="#B7BFD5"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default function ViewOffIcon(props: Partial<CustomIconComponentProps>): ReactElement {
  return <Icon component={defaultIcon} {...props} />
}
